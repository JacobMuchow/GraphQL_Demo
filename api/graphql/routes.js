var pg = require('pg');
var graphqlExp = require('express-graphql');

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

var TODOs = [  
  {
    "id": 1446412739542,
    "title": "Read emails",
    "completed": false
  },
  {
    "id": 1446412740883,
    "title": "Buy orange",
    "completed": true
  }
];

let TodoType = new GraphQLObjectType({
    name: 'todo',
    fields: function() {
        return {
            id: {
                type: GraphQLID
            },
            title: {
                type: GraphQLString
            },
            completed: {
                type: GraphQLBoolean
            }
        }
    }
});

let QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            todos: {
                type: new GraphQLList(TodoType),
                resolve: function() {
                    return new Promise(function(resolve, reject) {

                        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                            resolve(TODOs);
                            // client.query('SELECT * FROM test_table', function(err, result) {
                            //     done();
                            //     if (err) {
                            //         console.error(err);
                            //         res.send("Error " + err);
                            //     } else {
                            //         res.json({
                            //             result: result.rows
                            //         });
                            //     }
                            // });
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