exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.string("username").notNull().unique()
        table.string("password", 128).notNull()
        table.string("email").notNull()
        table.string("firstName")
        table.string("lastName")
        table.string("address")
        table.boolean("owner").defaultTo(false)
    })

    await knex.schema.createTable("itemCategory", (table) => {
        table.increments("id")
        table.string("category").unique()
    })

    await knex.schema.createTable("items", (table) => {
        table.increments("id")
        table.string("itemName", 128).notNull()
        table.decimal("itemPrice").notNull()
        table.text("description").notNull()
        table.string("imageUrl")
        table
            .integer("userId")
            .unsigned()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        table
            .integer("categoryId")
            .unsigned()
            .notNull()
            .references("id")
            .inTable("itemCategory")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("items")
    await knex.schema.dropTableIfExists("itemCategory")
    await knex.schema.dropTableIfExists("users")
};
