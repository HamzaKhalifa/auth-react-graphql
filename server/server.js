const express = require('express');
require('./models');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./services/auth');
const schema = require('./schema/schema');
const keys = require('./keys');

// Create a new Express application
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = keys.mongoURI;

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
const mongooseConfig = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}
mongoose.connect(MONGO_URI, mongooseConfig);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(cookieSession({
  // last for 30 days
  maxAge: 30 * 24 * 60 * 60 * 1000,
  // keys to encrypt the cookie in the requests
  keys: [keys.cookieKey],
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
