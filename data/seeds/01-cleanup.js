exports.seed = async function(knex) {
  await knex("users").truncate()
  await knex("itemCategory").truncate()
  await knex("items").truncate()
}