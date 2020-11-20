const supertest = require("supertest")
const { intersect } = require("../data/config")
const server = require("../server")
// bring this in for the afterAll funciton
const db = require("../data/config")
const itemsModel = require("../items/items-model")

//run the seeds before every single test, so each one can have a fresh start
beforeEach(async () => {
    await db("users").truncate()
    await db("itemCategory").truncate()
    await db("items").truncate()
    await db.seed.run()
})

//this is a jest hook that will run after all the tests in this file have ran
afterAll(async () => {
    // close the database connection before the test runner ends, to prevent any warnings about the leaks
    await db.destroy()
})

const user1 = {
    username: "test1234",
    password: "abc12345"
}

const regUser2 = {
    username: "test2345",
    password: "abc12345",
    email: "j@j.com"
}

const user2 = {
    username: "test2345",
    password: "abc12345"
}

describe("items integration test", () => {
    it("gets a list of items", async () => {
        const res = await supertest(server).get("/api/items")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].itemName).toBe("Dragon Fruit")
    })

    it("gets an item by id", async () => {
        const res = await supertest(server).get("/api/items/1")
        expect(res.type).toBe("application/json")
        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(1)
    })

    it("logs in a user and gets list of users", async () => {
        const res = await supertest(server).post("/api/login").send(user1)
        expect(res.statusCode).toBe(200)
    })

    it("registers a user and logs them in", async () => {
        const res = await supertest(server).post("/api/register").send(regUser2)
        const res2 = await supertest(server).post("/api/login").send(user2)
        expect(res.statusCode).toBe(201)
        expect(res2.statusCode).toBe(200)
    })

})