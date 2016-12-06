var gql = require('graphql');
var EventType = require('./EventType.js');

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
                    //Get a list of events for the festival queried
                    return new Promise(function(resolve, reject) {
                        pool.query('SELECT * FROM event WHERE festivalId = $1 ORDER BY event_time',  [root.id], function(err, result) {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                resolve(result.rows);
                            }
                        });
                    });
                }
            }
        }
    }
});