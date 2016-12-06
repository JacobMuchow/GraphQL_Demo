var gql = require ('graphql');
var FestivalType = require('./FestivalType.js');
var EventType = require('./../types/EventType.js');

module.exports = {
    type: EventType,
    args: {
        festivalId: { type: gql.GraphQLID },
        artistId: { type: gql.GraphQLID },
        description: { type: gql.GraphQLString },
        event_time: { type: gql.GraphQLString }
    },
    resolve: function(root, { festivalId, artistId, description, event_time }, pool) {
        return new Promise(function(resolve, reject) {
            pool.query('INSERT INTO event (festivalId, artistId, description, event_time) VALUES ($1, $2, $3, $4) RETURNING *', 
                    [festivalId, artistId, description, event_time], function(err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    }
}