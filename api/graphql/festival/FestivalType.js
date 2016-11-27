var gql = require('graphql');

module.exports = new gql.GraphQLObjectType({
    name: 'festival',
    fields: function() {
        return {
            id: { type: gql.GraphQLID },
            name: { type: gql.GraphQLString },
            description: { type: gql.GraphQLString }
        }
    }
});