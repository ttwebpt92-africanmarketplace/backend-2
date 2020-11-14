exports.seed = async function(knex) {
	await knex("items").insert([
    {itemName:"Dragon Fruit", itemPrice: 1, description: "A juicy red fruit with a dark fleshy center", imageUrl: "https://savingdinner.com/wp-content/uploads/2020/02/Dragon-Fruit-735x675.jpg", userId: 1, categoryId: 1},
    {itemName:"Lobster", itemPrice: 10, description: "Live lobester that is farm raised", imageUrl: "https://daysmaine.com/wp-content/uploads/2019/04/Craigs-Lobster--601x352.png", userId: 1, categoryId: 4},
    {itemName:"Carrot", itemPrice: 2, description: "A nutritious root vegetable", imageUrl: "https://foodandnutrition.org/wp-content/uploads/Savor-Carrots-780x520.jpg", userId: 1, categoryId: 2},
    {itemName:"Peanut Butter", itemPrice: 1, description: "A juicy red fruit with a dark fleshy center", imageUrl: "https://www.culinaryhill.com/wp-content/uploads/2019/04/Homemade-Peanut-Butter-HRSquare-Culinary-Hill10a.jpg", userId: 1, categoryId: 7},
	])
}