import { Header } from '@/components/Header';
import { hFilterValue } from '@/components/hFilterValue';
import { useQuery } from '@apollo/react-hooks';
import { Card, SearchBar } from 'antd-mobile';
import React, { useState } from 'react';
import searchQuery from '../queries/search';
import { NiosxData } from '../queries/types/NiosxData';
import * as styles from '../styles/search.module.css';

const Search: React.FC = () => {
  const [searchBlob, setSearchBlob] = useState<string>('');
  const { loading, error, data } = useQuery<NiosxData>(searchQuery);

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
                    Blob: {data.searchCollections.pageInfo.filters.blob}
                  </div>
                  <div>
                    From: {data.searchCollections.pageInfo.filters.date.from}
                  </div>
                  <div>
                    Languages:{' '}
                    {data.searchCollections.pageInfo.filters.lang.map(
                      hFilterValue,
                    )}
                  </div>
                  <div>
                    Media Types:{' '}
                    {data.searchCollections.pageInfo.filters.mediaTypes.map(
                      hFilterValue,
                    )}
                  </div>
                  <div>
                    Partners:{' '}
                    {data.searchCollections.pageInfo.filters.partners.map(
                      hFilterValue,
                    )}
                  </div>
                </div>
              ) : (
                'No Filters Found'
              )}
            </div>
            <div className={styles.entities}>
              {data.searchCollections.edges.map(({ node }) => (
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
        )}
        {loading && 'Loading data...'}
        {!loading && error && <div>{JSON.stringify(error.message)}</div>}
      </div>
    </main>
  );
};

export default Search;
