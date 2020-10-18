const graphql = require('graphql');
const UserType = require('./user_type');
const { GraphQLObjectType, GraphQLList } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, arges, req) {
        return req.user;
      }
    }
  }
});

module.exports = RootQueryType;
