import { Header } from '@/components/Header';
import { hFilterValue } from '@/components/hFilterValue';
import { FilterKey, filterReducer } from '@/reducers/search-reducer';
import { ImageSize } from '@/types/graphql-global-types';
import { useLazyQuery } from '@apollo/react-hooks';
import { Badge, Button, Card, SearchBar } from 'antd-mobile';
import { Link } from 'gatsby';
import React, { useReducer, useState } from 'react';
import searchQuery from '../queries/search';
import { NiosxData, NiosxDataVariables } from '../queries/types/NiosxData';
import * as styles from '../styles/search.module.css';
import { getKey, getType } from '../utils/get-key';

// TODO: move to utils and add tests
export const getFilters = (flatFilters: Record<string, boolean>) =>
  Object.keys(flatFilters)
    .filter((key) => flatFilters[key])
    .reduce<Partial<Record<FilterKey, string[]>>>((acc, key) => {
      const [type, uuid] = getType(key);

      return {
        ...acc,
        [type]: acc[type] ? acc[type].concat([uuid]) : [uuid],
      };
    }, {});

const Search: React.FC = () => {
  const [searchBlob, setSearchBlob] = useState<string>('');
  const [filters, dispatch] = useReducer(filterReducer, {});

  const [getEntities, { loading, error, data }] = useLazyQuery<
    NiosxData,
    NiosxDataVariables
  >(searchQuery, {
    onCompleted: (result) => {
      dispatch({
        type: 'SET',
        payload: {
          ...result.searchCollections.pageInfo.filters.lang
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({ ...acc, [getKey('lang', x.id)]: x.isSelected }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.mediaTypes
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({
                ...acc,
                [getKey('mediaTypes', x.id)]: x.isSelected,
              }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.partners
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({
                ...acc,
                [getKey('partners', x.id)]: x.isSelected,
              }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.people
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({ ...acc, [getKey('people', x.id)]: x.isSelected }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.places
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({ ...acc, [getKey('places', x.id)]: x.isSelected }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.subjects
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({
                ...acc,
                [getKey('subjects', x.id)]: x.isSelected,
              }),
              {},
            ),
        },
      });
    },
  });

  const refetchEntities = (val?: string) => {
    getEntities({
      variables: {
        blob: val ?? searchBlob,
        ...getFilters(filters),
      },
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchBlob(value);
    refetchEntities(value);
  };

  return (
    <main>
      <Header title="Search Page" />
      <div>
        <SearchBar
          placeholder="Search"
          value={searchBlob}
          onChange={handleSearchChange}
          cancelText="Clear"
        />
        <Button onClick={() => refetchEntities()}>Refetch</Button>
        {loading ? 'Loading data...' : ''}
        {!loading && error ? <div>{JSON.stringify(error.message)}</div> : ''}
        {!loading && !error && !data
          ? 'Enter a query to search the Archive'
          : ''}
        {!loading && !error && data && (
          <div className={styles.container}>
            <div className={styles.filters}>
              {data.searchCollections.pageInfo.filters !== null ? (
                <div>
                  <div>
                    From: {data.searchCollections.pageInfo.filters.date.from}
                  </div>
                  <div>
                    To: {data.searchCollections.pageInfo.filters.date.to}
                  </div>
                  <div>
                    <h3>Languages</h3>
                    {data.searchCollections.pageInfo.filters.lang.map((x) =>
                      hFilterValue(x, filters[getKey('lang', x.id)], () => {
                        dispatch({
                          type: 'TOGGLE',
                          payload: getKey('lang', x.id),
                        });
                      }),
                    )}
                  </div>
                  <div>
                    <h3>Subjects</h3>
                    {data.searchCollections.pageInfo.filters.subjects.map((x) =>
                      hFilterValue(x, filters[getKey('subjects', x.id)], () => {
                        dispatch({
                          type: 'TOGGLE',
                          payload: getKey('subjects', x.id),
                        });
                      }),
                    )}
                  </div>
                  <div>
                    <h3>People</h3>
                    {data.searchCollections.pageInfo.filters.people.map((x) =>
                      hFilterValue(x, filters[getKey('people', x.id)], () => {
                        dispatch({
                          type: 'TOGGLE',
                          payload: getKey('people', x.id),
                        });
                      }),
                    )}
                  </div>
                  <div>
                    <h3>Places</h3>
                    {data.searchCollections.pageInfo.filters.places.map((x) =>
                      hFilterValue(x, filters[getKey('places', x.id)], () => {
                        dispatch({
                          type: 'TOGGLE',
                          payload: getKey('places', x.id),
                        });
                      }),
                    )}
                  </div>
                  <div>
                    <h3>Partners</h3>
                    {data.searchCollections.pageInfo.filters.partners.map((x) =>
                      hFilterValue(x, filters[getKey('partners', x.id)], () => {
                        dispatch({
                          type: 'TOGGLE',
                          payload: getKey('partners', x.id),
                        });
                      }),
                    )}
                  </div>
                  <div>
                    <h3>Media Types</h3>
                    {data.searchCollections.pageInfo.filters.mediaTypes.map(
                      (x) =>
                        hFilterValue(
                          x,
                          filters[getKey('mediaTypes', x.id)],
                          () => {
                            dispatch({
                              type: 'TOGGLE',
                              payload: getKey('partners', x.id),
                            });
                          },
                        ),
                    )}
                  </div>
                </div>
              ) : (
                'No Filters Found'
              )}
            </div>
            <div className={styles.entities}>
              {data.searchCollections.pageInfo.filters.lang
                .filter((x) => filters[getKey('lang', x.id)])
                .map((x) => (
                  <Badge
                    key={x.id}
                    style={{ backgroundColor: '#f1c40f' }}
                    text={`lang: ${x.displayName}`}
                  />
                ))}
              {data.searchCollections.pageInfo.filters.mediaTypes
                .filter((x) => filters[getKey('mediaTypes', x.id)])
                .map((x) => (
                  <Badge
                    key={x.id}
                    style={{ backgroundColor: '#34495e', color: '#ecf0f1' }}
                    text={`mediaTypes: ${x.displayName}`}
                  />
                ))}
              {data.searchCollections.pageInfo.filters.partners
                .filter((x) => filters[getKey('partners', x.id)])
                .map((x) => (
                  <Badge
                    key={x.id}
                    style={{ backgroundColor: '#2ecc71' }}
                    text={`partners: ${x.displayName}`}
                  />
                ))}
              {data.searchCollections.pageInfo.filters.people
                .filter((x) => filters[getKey('people', x.id)])
                .map((x) => (
                  <Badge
                    key={x.id}
                    style={{ backgroundColor: '#3498db' }}
                    text={`people: ${x.displayName}`}
                  />
                ))}
              {data.searchCollections.pageInfo.filters.places
                .filter((x) => filters[getKey('places', x.id)])
                .map((x) => (
                  <Badge
                    key={x.id}
                    style={{ backgroundColor: '#e74c3c' }}
                    text={`places: ${x.displayName}`}
                  />
                ))}
              {data.searchCollections.edges.length > 0 ? (
                data.searchCollections.edges.map(
                  ({ node, isDirectMatch, annotationMatchCount }) => {
                    const thumbnail = node.images.find(
                      (i) => i.size === ImageSize.SMALL,
                    );

                    return (
                      <Link key={node.graphId} to={`/entities/${node.graphId}`}>
                        <Card>
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
                      </Link>
                    );
                  },
                )
              ) : (
                <div>No Records Found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
