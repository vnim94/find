const database = require('../../util/memoryDatabase');

beforeAll(async () => {
    await database.connect();
    await database.seed();
});

afterAll(async () => { await database.disconnect() });

describe('authenticate user', () => {

    const { authenticateUser } = require('../../src/middleware/auth');

    test('valid email and password return token and user', async () => {
        const authPayload = await authenticateUser('jsmith@email.com', 'password');
        
        expect(authPayload).toHaveProperty('token');
        expect(authPayload).toHaveProperty('user');
    })

})

describe('authenticate token', () => {

    const { authenticateToken, createToken } = require('../../src/middleware/auth');
    const jwt = require('jsonwebtoken');

    test('adds user id to request object if valid token', () => {
        const token = createToken('abc');
        const req = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        const res = {}
        const next = jest.fn();

        authenticateToken(req, res, next);

        expect(req.user).toBeTruthy();
        expect(req.user).toBe('abc')
        expect(next).toHaveBeenCalled();
    })

    test('no user property on req object if invalid token', () => {
        const token = jwt.sign('abc', 'abc');
        const req = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        const res = {}
        const next = jest.fn();

        authenticateToken(req, res, next);

        expect(req.user).toBeFalsy();
    })

})