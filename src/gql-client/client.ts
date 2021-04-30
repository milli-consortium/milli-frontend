import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // TODO: read url from config
    uri: 'http://localhost:9002/graphql',
    fetch,
  }),
});
