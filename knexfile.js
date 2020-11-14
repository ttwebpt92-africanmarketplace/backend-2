require("dotenv").config()

module.exports = {
	production: {
		client: "pg",
		connection: process.env.database_url,
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},
	development: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/market.db3",
		},
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},
	testing: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./data/test.db3",
		},
		migrations: {
			directory: "./data/migrations",
		},
		seeds: {
			directory: "./data/seeds",
		},
	},
}
