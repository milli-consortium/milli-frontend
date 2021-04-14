import React from 'react';
import { PageProps, graphql } from 'gatsby';
import Title from '@/components/Title';
import { NiosxDataQuery } from '../../graphql-types';

const keysOf = <T extends Record<string, unknown>>(o: T): Array<keyof T> =>
  Object.keys(o);

const Home: React.FC<PageProps<NiosxDataQuery>> = ({ data }) => (
  <main>
    <Title />
    <div>
      <div>Header</div>
      <div>Search Bar</div>
      <div>
        {data.niosx.searchCollections.pageInfo.filters
          ? keysOf(data.niosx.searchCollections.pageInfo.filters).map((key) => {
              const filter = data.niosx.searchCollections.pageInfo.filters[key];

              return typeof filter === 'string' ? (
                <div>{`Showing results for: ${filter}`}</div>
              ) : (
                <div>
                  <h3>{key}</h3>
                  {filter.map((f) => (
                    <div key={f.id}>
                      {f.displayName} ({f.recordCount ?? '--'})
                    </div>
                  ))}
                </div>
              );
            })
          : ''}
      </div>
    </div>
    <div>
      {data.niosx.searchCollections.edges.map((e) => (
        <div>{JSON.stringify(e.node)}</div>
      )) ?? <div>No Records Found</div>}
    </div>
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
            partner
            subjects
            dateOfCreation
            images {
              src
              alt
              size
            }
          }
          cursor
          offset
          isDirectMatch
          annotationMatchCount
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
