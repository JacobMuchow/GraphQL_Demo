var gql = require ('graphql');
var FestivalType = require('./../types/FestivalType.js');

module.exports = {
    type: FestivalType,
    args: {
        id: { type: gql.GraphQLID }
    },
    resolve: function(root, { id }, pool) {
        return new Promise(function(resolve, reject) {
            //Delete specified festival
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