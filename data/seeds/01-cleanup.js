exports.seed = async function(knex) {
  await knex("users").delete()
  await knex("itemCategory").delete()
  await knex("items").delete()
  await knex("items").truncate()
  await knex("itemCategory").truncate()
  await knex("users").truncate()
}