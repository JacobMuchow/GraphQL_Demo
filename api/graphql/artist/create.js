var gql = require ('graphql');
var ArtistType = require('./../types/ArtistType.js');

module.exports = {
    type: ArtistType,
    args: {
        name: { type: gql.GraphQLString },
        description: { type: gql.GraphQLString }
    },
    resolve: function(root, { name, description }, pool) {
        return new Promise(function(resolve, reject) {
            //Create a new artist with the data given
            pool.query('INSERT INTO artist (name, description) VALUES ($1, $2) RETURNING *', [name, description], function(err, result) {
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