import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_GRAPH_URL || 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})