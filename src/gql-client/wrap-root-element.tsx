import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { client } from './client';

export const wrapRootElement = (props: { element: React.Component }) => (
  <ApolloProvider client={client}>{props.element}</ApolloProvider>
);
