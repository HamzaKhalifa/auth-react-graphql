const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./types/root_query_type');
const Mutation = require('./types/mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation
});
