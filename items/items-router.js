const express = require("express")
const router = express.Router()
const { restrict, validateUserId } = require("../users/users-middleware")
const usersModel = require("../users/users-model")
const { remove } = require("./items-model")
const Items = require("./items-model")


router.get("/", async (req, res, next) => {
    try {
        res.status(200).json(await Items.find())
    } catch(err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const item = await Items.findById(req.params.id)
        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            })
        }

        res.status(200).json(item)
    } catch(err) {
        next(err)
    }
})

router.post("/", restrict(), validateUserId(), async (req, res, next) => {
    try {
        const { itemName, itemPrice, description, categoryId } = req.body
        if (!itemName || !itemPrice || !description || !categoryId) {
            return res.status(400).json({
                message: "Need an itemName, itemPrice, description, and categoryId"
            })
        }
        const newItem = await Items.add({
            itemName,
            itemPrice,
            description,
            categoryId,
            userId: req.user.id
        })

        return res.status(201).json(newItem)
    } catch(err) {
        next(err)
    }
})

router.put("/:id", restrict(), validateUserId(), async (req, res, next) => {
    try {
        const item = await Items.findById(req.params.id)
        console.log(item)
        if (!item) {
            return res.status(404).json({
                message: "This item does not exist"
            })
        }
        const userId = req.user.id
        console.log(userId)
        
        if (userId !== item.userId) {
            return res.status(404).json({
                message: "You dont own this item"
            })
        }
        const changes = {
            itemName: req.body.itemName,
            itemPrice: req.body.itemPrice,
            description: req.body.description,
            categoryId: req.body.categoryId,
            imageUrl: req.body.imageUrl
        }
        const { id } = req.params

        if (!changes.itemName || !changes.itemPrice || !changes.description || !changes.categoryId) {
            return res.status(400).json({
                message: "Need an itemName, itemPrice, description, and categoryId"
            })
        }

        const updatedItem = await Items.update(id, changes)

        res.status(202).json(updatedItem)
    } catch(err) {
        next(err)
    }
})

router.delete("/:id", restrict(), validateUserId(), async (req, res, next) => {
    try {
        const item = await Items.findById(req.params.id)
        console.log(item)
        if (!item) {
            return res.status(404).json({
                message: "This item does not exist"
            })
        }
        const userId = req.user.id

        if (userId !== item.userId) {
            return res.status(404).json({
                message: "You dont own this item"
            })
        }
        const deleteItem = await remove(req.params.id)
        res.json({
            message: "The item has been removed"
        })
    } catch(err) {
        next(err)
    }
})

// router.get("/", async (req, res, next) => {
//     try {

//     } catch(err) {
//         next(err)
//     }
// })


module.exports = router