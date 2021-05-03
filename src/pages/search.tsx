import { Header } from '@/components/Header';
import { hFilterValue } from '@/components/hFilterValue';
import { ImageSize } from '@/types/graphql-global-types';
import { useQuery } from '@apollo/react-hooks';
import { Card, SearchBar } from 'antd-mobile';
import React, { useState } from 'react';
import searchQuery from '../queries/search';
import { NiosxData } from '../queries/types/NiosxData';
import * as styles from '../styles/search.module.css';

const Search: React.FC = () => {
  const [searchBlob, setSearchBlob] = useState<string>('');
  const { loading, error, data } = useQuery<NiosxData>(searchQuery, {
    onCompleted: (result) => {
      setSearchBlob(result.searchCollections.pageInfo.filters.blob ?? '');
    },
  });

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
        {!loading && error === undefined && (
          <div className={styles.container}>
            <div className={styles.filters}>
              {data.searchCollections.pageInfo.filters !== null ? (
                <div>
                  <div>
                    From: {data.searchCollections.pageInfo.filters.date.from}
                  </div>
                  <div>
                    <h3>Languages</h3>
                    {data.searchCollections.pageInfo.filters.lang.map(
                      hFilterValue,
                    )}
                  </div>
                  <div>
                    <h3>Subjects</h3>
                    {data.searchCollections.pageInfo.filters.subjects.map(
                      hFilterValue,
                    )}
                  </div>
                  <div>
                    <h3>People</h3>
                    {data.searchCollections.pageInfo.filters.people.map(
                      hFilterValue,
                    )}
                  </div>
                  <div>
                    <h3>Places</h3>
                    {data.searchCollections.pageInfo.filters.places.map(
                      hFilterValue,
                    )}
                  </div>
                  <div>
                    <h3>Partners</h3>
                    {data.searchCollections.pageInfo.filters.partners.map(
                      hFilterValue,
                    )}
                  </div>
                  <div>
                    <h3>Media Types</h3>
                    {data.searchCollections.pageInfo.filters.mediaTypes.map(
                      hFilterValue,
                    )}
                  </div>
                </div>
              ) : (
                'No Filters Found'
              )}
            </div>
            <div className={styles.entities}>
              {data.searchCollections.edges.map(
                ({ node, isDirectMatch, annotationMatchCount }) => {
                  const thumbnail = node.images.find(
                    (i) => i.size === ImageSize.SMALL,
                  );

                  return (
                    <Card key={node.graphId}>
                      <Card.Header title={node.title} />
                      <Card.Body>
                        <div>
                          {thumbnail && (
                            <img src={thumbnail.src} alt={thumbnail.alt} />
                          )}
                          Created on: {node.dateOfCreation}
                        </div>
                      </Card.Body>
                      <Card.Footer
                        content={
                          <div>
                            Your search matched{' '}
                            {isDirectMatch ? 'this object and' : ''}{' '}
                            {annotationMatchCount > 0
                              ? `${annotationMatchCount} annotations ${
                                  isDirectMatch ? 'on it' : 'on this object'
                                }`
                              : ''}
                          </div>
                        }
                      />
                    </Card>
                  );
                },
              ) ?? <div>No Records Found</div>}
            </div>
          </div>
        )}
        {loading && 'Loading data...'}
        {!loading && error && <div>{JSON.stringify(error.message)}</div>}
      </div>
    </main>
  );
};

export default Search;
