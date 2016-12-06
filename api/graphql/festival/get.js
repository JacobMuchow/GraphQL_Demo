var gql = require ('graphql');
var FestivalType = require('./../types/FestivalType.js');

module.exports = {
    type: FestivalType,
    args: {
        id: { type: gql.GraphQLID }
    },
    resolve: function(root, { id }, pool) {
        return new Promise(function(resolve, reject) {
            //Get data for specified festival
            pool.query('SELECT * FROM festival WHERE id = $1', [id], function(err, result) {
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