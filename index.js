import {name as appName} from './app.json';
import React from 'react';
import {AppRegistry} from 'react-native';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/react-hooks';
import Main from './Main';
import {InMemoryCache, HttpLink} from 'apollo-boost';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
});

const client = new ApolloClient({
  cache,
  link,
});

const App = () => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
