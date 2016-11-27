var gql = require ('graphql');
var FestivalType = require('./FestivalType');

module.exports = {
    type: FestivalType,
    args: {
        id: {
            type: gql.GraphQLID
        }
    },
    resolve: function(root, args, pool) {
        return new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM festival WHERE id = $1', [args.id], function(err, result) {
                resolve(result.rows[0]);
            });
        });
    }
}