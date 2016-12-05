var gql = require ('graphql');
var ArtistType = require('./../types/ArtistType.js');

module.exports = {
    type: ArtistType,
    args: {
        id: { type: gql.GraphQLID }
    },
    resolve: function(root, { id }, pool) {
        return new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM artist WHERE id = $1', [id], function(err, result) {
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