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

import gql from 'graphql-tag';

import { Provider } from 'mobx-react';
import { observable, action, computed, runInAction, autorun } from 'mobx';

import './index.css';

// Simple API:        https://api.graph.cool/simple/v1/cjchln8qs0if10139h3nucp2t
//   Relay API:         https://api.graph.cool/relay/v1/cjchln8qs0if10139h3nucp2t
//   Subscriptions API: wss://subscriptions.ap-northeast-1.graph.cool/v1/cjchln8qs0if10139h3nucp2t
// const __SIMPLE_API_ENDPOINT__ = 'https://api.graph.cool/simple/v1/cjchln8qs0if10139h3nucp2t';

const __SIMPLE_API_ENDPOINT__ = 'https://api.github.com/graphql';
const token = '39ab499cd09f3836914731346e7000b840e02f24';

const httpLink = new HttpLink({ uri: __SIMPLE_API_ENDPOINT__ });

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  // const token = localStorage.getItem('GC_AUTH_TOKEN');
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      Authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

// const __SUBSCRIPTION_API_ENDPOINT__ =
//   'wss://subscriptions.ap-northeast-1.graph.cool/v1/cjchln8qs0if10139h3nucp2t';
// const wsLink = new WebSocketLink({
//   uri: __SUBSCRIPTION_API_ENDPOINT__,
//   options: {
//     reconnect: true,
//     timeout: 30000,
//     connectionParams: {
//       authToken: localStorage.getItem('GC_AUTH_TOKEN'),
//     },
//   },
// });

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query);
//     return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   wsLink,
//   httpLinkWithAuthToken
// );

export const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
});

console.log(client);
class ListStore {
  @observable searchItem = 'javascript react';
  @observable nodes = [];
  @observable loading = false;

  constructor(client) {
    this.client = client;
    autorun(() => {
      console.log('this.nodes.length', this.nodes.length);
    });
  }

  @action
  async queryNodes(searchItem) {
    console.log('this.client', this.client);
    // debugger;
    this.loading = true;
    this.nodes.length = 0;
    const response = await this.client.query({
      query: QUERY_LIST,
      fetchPolicy: 'network-only',
      variables: {
        first: 10,
        query: searchItem + 'sort:stars-desc',
        type: 'REPOSITORY',
      },
    });
    console.log(response.data.search);
    runInAction(() => {
      this.loading = false;
      this.nodes.push(...response.data.search.nodes);
    });
  }
}

const QUERY_LIST = gql`
  query($first: Int, $query: String!, $type: SearchType!) {
    search(first: $first, query: $query, type: $type) {
      codeCount
      nodes {
        __typename
        ... on Repository {
          id
          url
          name
          homepageUrl
          owner {
            login
            avatarUrl
          }
          nameWithOwner
          description
          createdAt
          forkCount

          watchers {
            totalCount
          }
          stargazers(first: 10) {
            totalCount
          }
          ... on RepositoryInfo {
            __typename
            shortDescriptionHTML
            resourcePath
          }
        }
      }
    }
  }
`;

const listStore = new ListStore(client);
console.log('listStore', listStore);

const stores = { listStore };

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider {...stores}>
      <App />
    </Provider>
  </ApolloProvider>,

  document.getElementById('root')
);
registerServiceWorker();
