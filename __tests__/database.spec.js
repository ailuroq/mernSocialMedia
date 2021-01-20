const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../app')
const {MongoMemoryServer} = require('mongodb-memory-server');
const initial = require('../app/database/initialRoles')
const userModel = require('../app/models/user.model')
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

describe('...', () => {
    it('...', async () => {
    await request(app).post("/api/auth/signup")
            .send({
                username: "yaroslav",
                email: "email@email.ru",
                password: "password"
            })
            .expect(200)
    });
});