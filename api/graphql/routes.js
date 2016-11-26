var pg = require('pg');
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

var {
  graphql,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql');

let EventType = new GraphQLObjectType({
    name: 'event',
    fields: function() {
        return {
            id: {
                type: GraphQLID
            },
            name: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            event_time: {
                type: GraphQLString
            }
        }
    }
});

let QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            events: {
                type: new GraphQLList(EventType),
                resolve: function() {
                    return new Promise(function(resolve, reject) {

                        pool.query('SELECT * FROM event', function(err, result) {
                            //TODO: handle error
                            resolve(result.rows);
                        });
                    });
                }
            }
        }
    }
});

let Schema = new GraphQLSchema({
    query: QueryType
});

module.exports = function(app) {
    app.use('/api/graphql', graphqlExp({
        schema: Schema
    }));
};