var pg = require('pg');
var graphql = require('graphql');
var graphqlExp = require('express-graphql');

var pool = new pg.Pool({
    host: process.env.DATABASE_URL,
    database: 'rootsnblues',
    max: 10,
    idleTimeoutMillis: 1000
});

pool.on('error', function(err, client) {
    console.log(err);
});

let festival = require('./festival/get.js');
let festivals = require('./festival/getmany.js');

let QueryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            festival: festival,
            festivals: festivals
        }
    }
});

let Schema = new graphql.GraphQLSchema({
    query: QueryType
});

module.exports = function(app) {
    app.use('/api/graphql', graphqlExp({
        schema: Schema,
        context: pool
    }));
};