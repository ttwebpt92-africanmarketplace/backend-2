const bcrypt = require("bcryptjs")

exports.seed = async function(knex) {
	await knex("users").insert([
		{ username: "test1234", password: await bcrypt.hash("abc12345", 14), email: "j@j.com", firstName: "Jacob", lastName: "E", address: "123 Street, Las Vegas, NV 89101", owner: true},
	])
}