var gql = require ('graphql');
var FestivalType = require('./FestivalType.js');

module.exports = {
    type: FestivalType,
    args: {
        id: { type: gql.GraphQLID }
    },
    resolve: function(root, { id }, pool) {
        return new Promise(function(resolve, reject) {
            pool.query('DELETE FROM festival WHERE id = $1 RETURNING *', [id], function(err, result) {
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