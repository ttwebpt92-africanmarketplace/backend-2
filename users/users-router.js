const express = require("express");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const { restrict } = require("./users-middleware")
const router = express.Router();

router.get("/users", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch(err) {
        next(err)
    }
})

router.get("/users/:id", restrict(), async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.json(user)
    } catch(err) {
        next(err)
    }
})

router.delete("/users/:id", restrict(), async (req, res, next) => {
    try {
        const user = await Users.remove(req.params.id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.json({
            message: "User has been deleted"
        })
    } catch(err) {
        next(err)
    }
})

router.post("/login", async (req, res, next)=>{
    try {
        const { username, password } = req.body
		const user = await Users.findByUsername(username)
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
        }
        const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
        }

        const options = {expiresIn: "1d"}

        const token = jwt.sign({
			userId: user.id,
			owner: user.owner,

        }, process.env.JWT_SECRET, options)

        res.cookie("token", token)

		res.json({
            message: `Welcome ${user.username}!`,
            userId: user.id,
            owner: user.owner,
			token: token,
		})
        
    } catch(err) {
        next(err)
    }
});

router.post("/register", async (req, res, next)=>{
    try {
        const { 
            username,
            password,
            firstName,
            lastName,
            email,
            address,
            owner} = req.body

        const user = await Users.findByUsername(username)

        if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
        }
        
        const newUser = await Users.add({
            username,
            password: await bcrypt.hash(password, 14),
            firstName,
            lastName,
            email,
            address,
            owner
        })

        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
});

router.get("/logout", async (req, res, next) => {
	try {
		res.clearCookie("token").end()
	} catch (err) {
		next(err)
	}
})

module.exports = router;