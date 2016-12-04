var pg = require('pg');
var gql = require('graphql');
var gqlExp = require('express-graphql');

var pool = new pg.Pool({
    host: process.env.DATABASE_URL,
    database: 'rootsnblues',
    max: 10,
    idleTimeoutMillis: 1000
});

pool.on('error', function(err, client) {
    console.log(err);
});

let getFestival = require('./festival/get.js');
let listFestivals = require('./festival/list.js');
let createFestival = require('./festival/create.js');
let deleteFestival = require('./festival/delete.js');

let QueryType = new gql.GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            getFestival: getFestival,
            listFestivals: listFestivals
        }
    }
});

let MutationType = new gql.GraphQLObjectType({
    name: 'Mutation',
    fields: function() {
        return {
            createFestival: createFestival,
            deleteFestival: deleteFestival
        }
    }
});

let Schema = new gql.GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

module.exports = function(app) {
    app.use('/api/graphql', gqlExp({
        schema: Schema,
        context: pool
    }));

    app.use('/api/graphiql', gqlExp({
        schema: Schema,
        graphiql: true,
        context: pool
    }));
};