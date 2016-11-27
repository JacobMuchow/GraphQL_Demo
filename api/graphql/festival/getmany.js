let gql = require('graphql');
let FestivalType = require('./FestivalType');

module.exports = function(pool) {
    return {
        type: new gql.GraphQLList(FestivalType),
        resolve: function() {
            return new Promise(function(resolve, reject) {
                pool.query('SELECT * FROM festival', function(err, result) {
                    resolve(result.rows);
                });
            });
        }
    }
}