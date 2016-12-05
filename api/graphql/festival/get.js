var gql = require ('graphql');
var FestivalType = require('./FestivalType');

module.exports = {
    type: FestivalType,
    args: {
        id: { type: gql.GraphQLID }
    },
    resolve: function(root, { id }, pool) {
        return new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM festival WHERE id = $1', [id], function(err, result) {
                resolve(result.rows[0]);
            });
        });
    }
}