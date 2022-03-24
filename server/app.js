const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));	

const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/api/schema');
app.use(
    '/api',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
)

module.exports = app;
