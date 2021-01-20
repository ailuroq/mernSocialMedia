const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const initial = require('../../app/database/initialRoles')
const app = require('../../app')
const request = require('supertest')
//const mongoServer = new MongoMemoryServer();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const opts = { useNewUrlParser: true }; // remove this option if you use mongoose 5 and above

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts, (err) => {
        if (err) console.error(err);
        initial()
        console.log('test db started')
    });

});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});


describe('authentication', () => {
    test('successful registration (200)', async () => {
        await request(app)
            .post("/api/auth/signup")
            .send({
                username: "yaroslav",
                email: "email@email.ru",
                password: "password"
            })
            .expect(200)
    });
    test('successful login (200)', async () => {
        await request(app)
            .post("/api/auth/signin")
            .send({
                username: "yaroslav",
                email: "email@email.ru",
                password: "password"
            })
            .expect(200)
    });
    test('successful access allPage (200)', async () => {
        await request(app)
            .get("/api/test/all")
            .expect(200)
    });
    test('access denied user Page (403)', async () => {
        await request(app)
            .get("/api/test/user")
            .expect(403)
    });
    test('access denied admin Page (403)', async () => {
        await request(app)
            .get("/api/test/admin")
            .expect(403)
    });

});