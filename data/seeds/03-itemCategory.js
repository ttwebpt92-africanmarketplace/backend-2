exports.seed = async function(knex) {
	await knex("itemCategory").insert([
    {category: "fruit"},
    {category: "vegetable"},
    {category: "dairy"},
    {category: "meat"},
    {category: "seasoning"},
    {category: "beverage"},
    {category: "condiment"}
	])
}