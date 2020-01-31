const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig.js');

describe('server', () => {
    describe('test env', () => {
        it('', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
    });
    it('runs the server', () => {
        expect(true).toBe(true);
    });
    describe('get /', () => {
        it('should return 200 ok', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
        it('should return api: Api is running', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body.api).toBe('Api is running.');
                });
        });
        it('content type should be json', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toBe('application/json');
                });
        });
    });

    describe('post to /api/auth/register', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });
        it('should return status 201', () => {
            return request(server)
                .post('/api/auth/register')
                .send({
                    "username": "todd",
                    "password": "hello",
                    "department": "coding"
                })
                .then(res => {
                    expect(res.status).toBe(201);
                    expect(res.body.username).toBe('todd');
                });
        });
    });

    describe('post to /api/auth/login', () => {
        const user = {
                username: 'todd',
                password: 'hello'
            };

        it('should return message: Welcome jacob', () => {
            return request(server)
                .post('/api/auth/login')
                .send(user)
                .then(res => {
                    expect(res.body.message).toBe('Welcome todd!');
                });
        });
        it('status should be 200', () => {
            return request(server)
                .post('/api/auth/login')
                .send(user)
                .then(res => {
                    expect(res.status).toBe(200);
                });
        })
    });

    describe('users', () => {

        it('get all users', () => {
            return request(server)
                .get('/api/users')
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(res.body.users[0].username).toBe('todd');
                });
        });
    });
});