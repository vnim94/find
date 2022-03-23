const request = require('supertest');
const express = require('express');
const app = express();

describe('user routes', () => {

    test('GET request for index', () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

});
