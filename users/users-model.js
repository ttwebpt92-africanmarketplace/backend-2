const db = require("../data/config")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
}

function find() {
	return db("users as u")
		.select("u.id", "u.username")
}

function findByUsername(username) {
	return db("users as u")
		.where("u.username", username)
		.first("u.id", "u.username", "u.password", "u.owner")
}

function findById(id) {
    return db("users as u")
        .select("u.id", "u.username", "u.owner")
        .where("u.id", id)
        .first()
}

function remove(id) {
	return db("users as u")
	.select("u.id", "u.username")
	.where("u.id", id)
	.del()
}

module.exports = {
	add,
	find,
    findByUsername,
	findById,
	remove
}