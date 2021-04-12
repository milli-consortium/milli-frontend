import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Title from '@/components/Title';
import { NiosxDataQuery } from '../../graphql-types';

const Home: React.FC<PageProps<NiosxDataQuery>> = ({ data }) => (
  <main>
    <Title />
    <p>{JSON.stringify(data)}</p>
  </main>
);

export default Home;

export const query = graphql`
  query NiosxData {
    niosx {
      searchCollections {
        edges {
          node {
            graphId
            title
          }
          cursor
          offset
        }
        pageInfo {
          endCursor
          hasNextPage
          filters {
            blob
            lang {
              displayName
              recordCount
            }
            subjects {
              displayName
              recordCount
            }
          }
        }
      }
    }
  }
`;
