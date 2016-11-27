var gql = require('graphql');

module.exports = new gql.GraphQLObjectType({
    name: 'event',
    fields: function() {
        return {
            id: { type: gql.GraphQLID },
            festivalId: { type: gql.GraphQLID },
            artistId: { type: gql.GraphQLID },
            description: { type: gql.GraphQLString },
            event_time: { type: gql.GraphQLString }
        }
    }
});