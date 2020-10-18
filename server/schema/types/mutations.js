const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');
const UserType = require('./user_type');
const { signup, login } = require('../../services/auth');

const Mutation = new GraphQLObjectType({
    name: 'Mutation', 
    fields: {
        signup: { 
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return signup({ email, password, req });
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return login({ email, password, req});
            }
        },
        logout: {
            type: UserType ,
            resolve(parentValue, args, req) {
                console.log('logout req user', req.user);
                const { user } = req;
                req.logout();
                
            }
        }
    }
});

module.exports = Mutation;