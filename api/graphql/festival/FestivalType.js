var gql = require('graphql');
var EventType = require('./../types/EventType.js');

module.exports = new gql.GraphQLObjectType({
    name: 'festival',
    fields: function() {
        return {
            id: { type: gql.GraphQLID },
            name: { type: gql.GraphQLString },
            description: { type: gql.GraphQLString },
            events: {
                type: new gql.GraphQLList(EventType),
                resolve: function(root, args, pool) {
                    return new Promise(function(resolve, reject) {
                        pool.query('SELECT * FROM event WHERE id = $1',  [root.id], function(err, result) {
                            resolve(result.rows);
                        });
                    });
                }
            }
        }
    }
});