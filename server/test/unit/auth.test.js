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