let gql = require('graphql');
var FestivalType = require('./../types/FestivalType.js');

module.exports = {
    type: new gql.GraphQLList(FestivalType),
    resolve: function(root, args, pool) {
        return new Promise(function(resolve, reject) {
            //Get all festivals
            pool.query('SELECT * FROM festival', function(err, result) {
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