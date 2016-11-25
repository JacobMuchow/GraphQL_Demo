var pg = require('pg');
var graphqlExp = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        hello: String
    }
`);

var root = { 
    hello: () => {
        return 'Hello world!';
    }
};

module.exports = function(app) {
    app.all('/api/graphql', graphqlExp({
        schema: schema,
        rootValue: root,
        graphiql: false
    }));
};