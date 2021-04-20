import { Header } from '@/components/Header';
import { gql } from '@apollo/client';
import { Card, SearchBar } from 'antd-mobile';
import { graphql, PageProps } from 'gatsby';
import React, { useEffect, useState } from 'react';
import { NiosxDataQuery } from '../../graphql-types';
import client from '../client';
import * as styles from '../styles/search.module.css';
import { hFilterValue } from './hFilterValue';

const keysOf = <T extends Record<string, unknown>>(o: T): Array<keyof T> =>
  Object.keys(o);

const Search: React.FC<PageProps<NiosxDataQuery>> = ({ data }) => {
  const [searchBlob, setSearchBlob] = useState<string>('');
  useEffect(() => {
    client
      .query({
        query: gql`
          query getEntities {
            searchCollections {
              edges {
                node {
                  graphId
                  title
                }
                cursor
                offset
              }
            }
          }
        `,
      })
      // eslint-disable-next-line no-console
      .then((result) => console.log('useEffect result', result));
  }, [searchBlob]);

  return (
    <main>
      <Header title="Search Page" />
      <div>
        <SearchBar
          placeholder="Search"
          value={searchBlob}
          onChange={setSearchBlob}
          cancelText="Clear"
        />
        <div className={styles.container}>
          <div className={styles.filters}>
            {data.niosx.searchCollections.pageInfo.filters
              ? keysOf(data.niosx.searchCollections.pageInfo.filters).map(
                  (key) =>
                    key !== 'blob' && key !== 'date' ? (
                      <div key={key}>
                        <h3>{key}</h3>
                        {data.niosx.searchCollections.pageInfo.filters[key].map(
                          hFilterValue,
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
};

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
            date {
              from
              to
            }
            lang {
              id
              displayName
              recordCount
              isSelected
            }
            subjects {
              id
              displayName
              recordCount
              isSelected
            }
            people {
              id
              displayName
              recordCount
              isSelected
            }
            places {
              id
              displayName
              recordCount
              isSelected
            }
            partners {
              id
              displayName
              recordCount
              isSelected
            }
            mediaTypes {
              id
              displayName
              recordCount
              isSelected
            }
          }
        }
      }
    }
  }
`;
