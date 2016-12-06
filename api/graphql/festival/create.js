var gql = require ('graphql');
var FestivalType = require('./../types/FestivalType.js');

module.exports = {
    type: FestivalType,
    args: {
        name: { type: gql.GraphQLString },
        description: { type: gql.GraphQLString }
    },
    resolve: function(root, { name, description }, pool) {
        return new Promise(function(resolve, reject) {
            //Create festival with given data
            pool.query('INSERT INTO festival (name, description) VALUES ($1, $2) RETURNING *', [name, description], function(err, result) {
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