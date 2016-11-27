let gql = require('graphql');
let FestivalType = require('./FestivalType');

module.exports = {
    type: new gql.GraphQLList(FestivalType),
    resolve: function(root, args, pool) {
        return new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM festival', function(err, result) {
                resolve(result.rows);
            });
        });
    }
}