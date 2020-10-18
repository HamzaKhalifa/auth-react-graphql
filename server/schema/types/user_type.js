const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString }
    }
})

module.exports = UserType;