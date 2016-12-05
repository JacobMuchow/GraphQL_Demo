var gql = require ('graphql');
var ArtistType = require('./../types/ArtistType.js');

module.exports = {
    type: new gql.GraphQLList(ArtistType),
    args: {
        name: { type: gql.GraphQLString }
    },
    resolve: function(root, { name }, pool) {
        return new Promise(function(resolve, reject) {
            filter = "%" + name + "%";
            pool.query('SELECT * FROM artist WHERE name LIKE $1', [filter], function(err, result) {
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