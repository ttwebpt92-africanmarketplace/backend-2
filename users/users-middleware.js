const { JsonWebTokenError } = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")

function restrict(role) {
	return async (req, res, next) => {
		try {
			const token = req.headers.authorization;
			if (!token) {
				return res.status(401).json({
					message: "invalid credentials",
				})
            }
            
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json({
						message: "invalid credentials"
					})
				}

				req.user = decoded
				
				next()
			})

		} catch(err) {
			next(err)
		}
	}
}

function validateUserId() {
	return async (req, res, next) => {
	  try {
		const user = await Users.findById(req.user.userId);
		if (user) {
		  req.user = user;
		  next();
		} else {
		  res.status(404).json({ message: 'User not found' });
		}
	  } catch (err) {
		next(err);
	  }
	};
  }

module.exports = {
	restrict,
	validateUserId
}