var gql = require('graphql');
var ArtistType = require('./ArtistType.js');

module.exports = new gql.GraphQLObjectType({
    name: 'event',
    fields: function() {
        return {
            id: { type: gql.GraphQLID },
            festivalId: { type: gql.GraphQLID },
            artistid: { type: gql.GraphQLID },
            description: { type: gql.GraphQLString },
            event_time: { type: gql.GraphQLString },
            artist: {
                type: ArtistType,
                resolve: function(root, args, pool) {
                    return new Promise(function(resolve, reject) {
                        pool.query('SELECT * FROM artist WHERE id = $1', [root.artistid], function(err, result) {
                            resolve(result.rows[0]);
                        });
                    });
                }
            }
        }
    }
});