// Reference docs here: https://www.apollographql.com/docs/react/networking/authentication/
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-fetch';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.milli.link/graphql',
  fetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
