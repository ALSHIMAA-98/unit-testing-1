const request = require('supertest');
const userModel = require('..');
const { clearDatabase } = require('../db.connection');

const req = request(userModel)
describe("lab testing:", () => {

    describe("users routes:", () => {
        // Note: user name must be sent in req query not req params
        it("req to get(/search) ,expect to get the correct user with his name", async () => {
            const invalidName = "InvalidUserName";
            const response = await request(server).get("/user/search").query({ name: invalidName });
        })
    })
    it("req to get(/search) with invalid name ,expect res status and res message to be as expected", async () => {

        const invalidName = "InvalidUserName";
        const response = await request(server).get("/user/search").query({ name: invalidName });
        expect(response.status).toBe(404);
    })

    it("req to delete(/) ,expect res status to be 200 and a message sent in res", async () => {

        const response = await request(server).delete("/user");
        expect(response.status).toBe(200);
    })
})


describe("todos routes:", () => {
    beforeAll(async () => {
        let mockUser = { name: "nada", email: "asd@yahoo.com", password: "123" }
        let res1 = await req.post("/user/signup").send(mockUser)
        userInDB = res1.body.data

    })
    it("req to patch(/) with id only ,expect res status and res message to be as expected", async () => {
        let res = await req.patch("/").send()
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(11);


    })
    it("req to patch(/) with id and title ,expect res status and res to be as expected", async () => {

        const res = await request(server).patch("/").send({ id: userInDB.id, title: "New Title" });
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(userInDB.id);
        expect(res.body.title).toBe("New Title");

    })

    it("req to get( /user) ,expect to get all user's todos", async () => {

        const res = await request(server).get(`/user/${userInDB.id}/todos`);
        expect(res.status).toBe(200);
    })
    it("req to get( /user) ,expect to not get any todos for user hasn't any todo", async () => {
        const res = await request(server).get(`/user/${userInDB.id}/todos`);
        expect(res.status).toBe(404);
    })

})

afterAll(async () => {
    await clearDatabase()
})


