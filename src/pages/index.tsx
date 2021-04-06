import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Title from '@/components/Title';
import { NiosxDataQuery } from '../../graphql-types';

const Home: React.FC<PageProps<NiosxDataQuery>> = ({ data }) => (
  <main>
    <Title />
    <p>A TypeScript starter for Gatsby. Great for advanced users.</p>
    <p>
      Follow me on Twitter (
      <a href="https://twitter.com/jpedroschmitz">@jpedroschmitz</a>)
    </p>
    <p>{JSON.stringify(data)}</p>
  </main>
);

export default Home;

export const query = graphql`
  query NiosxData {
    niosx {
      allCollections {
        graphId
        title
        creator
      }
    }
  }
`;
