import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';

const client = new ApolloClient({
  uri: '/graphql'
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App>
          <Route component={LoginForm} path="/login" exact />
          <Route component={SignupForm} path="/signup" exact />
          <Route component={Dashboard} path="/dashboard" exact />
        </App>
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
