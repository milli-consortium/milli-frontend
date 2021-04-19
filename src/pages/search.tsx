import { Header } from '@/components/Header';
import { Card } from 'antd-mobile';
import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { NiosxDataQuery } from '../../graphql-types';
import * as styles from '../styles/search.module.css';

const keysOf = <T extends Record<string, unknown>>(o: T): Array<keyof T> =>
  Object.keys(o);

const Search: React.FC<PageProps<NiosxDataQuery>> = ({ data }) => (
  <main>
    <Header title="Search Page" />
    <div>
      <div>Search Bar</div>
      <div className={styles.container}>
        <div className={styles.filters}>
          {data.niosx.searchCollections.pageInfo.filters
            ? keysOf(data.niosx.searchCollections.pageInfo.filters).map((key) =>
                key !== 'blob' ? (
                  <div key={key}>
                    <h3>{key}</h3>
                    {data.niosx.searchCollections.pageInfo.filters[key].map(
                      (f) => (
                        <div key={f.id}>
                          {f.displayName} ({f.recordCount ?? '--'})
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  ''
                ),
              )
            : ''}
        </div>
        <div className={styles.entities}>
          {data.niosx.searchCollections.edges.map(({ node }) => (
            <Card key={node.graphId}>
              <Card.Header
                title={node.title}
                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              />
              <Card.Body>
                <div>Created on: {node.dateOfCreation}</div>
              </Card.Body>
              <Card.Footer content="footer content" />
            </Card>
          )) ?? <div>No Records Found</div>}
        </div>
      </div>
    </div>
  </main>
);

export default Search;

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
              id
              displayName
              recordCount
            }
            subjects {
              id
              displayName
              recordCount
            }
          }
        }
      }
    }
  }
`;
