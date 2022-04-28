const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

app.use(cors({ origin: "https://find-server-v1.herokuapp.com/" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));	

const { authenticateToken } = require('./src/middleware/auth');
app.use(authenticateToken);

const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./src/api/schema');
app.use(
    '/api',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
        customFormatErrorFn: (error) => ({
            message: error.message
        })
    })
)

module.exports = app;
