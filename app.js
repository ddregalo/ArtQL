'use strict'

const graphql = require('graphql')
const express = require ('express')
const expressGraphQl = require('express-graphql')
const { GraphQLSchema } = graphql
const { query } = require('./schemas/queries.js')
const { mutation } = require('./schemas/mutations.js')

const schema = new GraphQLSchema({
    query,
    mutation
})


var app = express();

app.use(
    '/',
    expressGraphQl({
        schema: schema,
        graphiql: true
    })
)

app.listen(3000, () => 
    console.log('GraphQL server is ready and listening on port 3000')
)