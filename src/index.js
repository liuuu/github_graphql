import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-client-preset';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import './index.css';

// Simple API:        https://api.graph.cool/simple/v1/cjchln8qs0if10139h3nucp2t
//   Relay API:         https://api.graph.cool/relay/v1/cjchln8qs0if10139h3nucp2t
//   Subscriptions API: wss://subscriptions.ap-northeast-1.graph.cool/v1/cjchln8qs0if10139h3nucp2t
const __SIMPLE_API_ENDPOINT__ = 'https://api.graph.cool/simple/v1/cjchln8qs0if10139h3nucp2t';
const httpLink = new HttpLink({ uri: __SIMPLE_API_ENDPOINT__ });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('GC_AUTH_TOKEN');
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const __SUBSCRIPTION_API_ENDPOINT__ =
  'wss://subscriptions.ap-northeast-1.graph.cool/v1/cjchln8qs0if10139h3nucp2t';
const wsLink = new WebSocketLink({
  uri: __SUBSCRIPTION_API_ENDPOINT__,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: {
      authToken: localStorage.getItem('GC_AUTH_TOKEN'),
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithAuthToken
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById('root')
);
registerServiceWorker();
