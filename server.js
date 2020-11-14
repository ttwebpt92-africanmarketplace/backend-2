const express = require("express")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const usersRouter = require("./users/users-router")
const itemsRouter = require("./items/items-router")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(cookieParser())
// remove this when adding cookie parser
// server.use(session({
// 	resave: false, // avoid recreating sessions that have not changed
// 	saveUninitialized: false, // comply with GDPR laws for setting cookies automatically
// 	secret: "keep it secret, keep it safe", // cryptographically sign the cookie
// }))

server.use("/api", usersRouter)
server.use("/api/items", itemsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = server