import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import {
  hLanguageFilter,
  hPartnerFilter,
  hPersonFilter,
  hPlaceFilter,
  hSubjectFilter,
} from '@/components/hFilterValue';
import SearchCard from '@/components/SearchCard';
import SearchSetting from '@/components/SearchSetting';
import { filterReducer } from '@/reducers/search-reducer';
import { ImageSize } from '@/types/graphql-global-types';
import { badgeColors } from '@/utils/badge-color';
import { useLazyQuery } from '@apollo/react-hooks';
import { Col, Input, Pagination, Row } from 'antd';
import { Accordion, Badge, Button, Flex, List, SearchBar } from 'antd-mobile';
import 'antd/dist/antd.css';
import { Link } from 'gatsby';
import React, { useReducer, useState } from 'react';
import searchQuery from '../queries/search';
import { NiosxData, NiosxDataVariables } from '../queries/types/NiosxData';
import '../styles/search.css';
import * as styles from '../styles/search.module.css';
import { getKey } from '../utils/get-key';

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
              (acc, x) => ({
                ...acc,
                [getKey('lang', x.graphId)]: x.isSelected,
              }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.partners
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({
                ...acc,
                [getKey('partners', x.graphId)]: x.isSelected,
              }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.people
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({
                ...acc,
                [getKey('people', x.graphId)]: x.isSelected,
              }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.places
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({
                ...acc,
                [getKey('places', x.graphId)]: x.isSelected,
              }),
              {},
            ),
          ...result.searchCollections.pageInfo.filters.subjects
            .filter((x) => x.isSelected)
            .reduce(
              (acc, x) => ({
                ...acc,
                [getKey('subjects', x.graphId)]: x.isSelected,
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
        // ...getFilters(filters),
      },
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchBlob(value);
    refetchEntities(value);
  };

  return (
    <>
      <main>
        <Header title="Search Page" />
        <div>
          <div className="px15">
            <Row gutter={16}>
              <Col className="gutter-row" span={20}>
                <SearchBar
                  placeholder="Blog"
                  value={searchBlob}
                  onChange={handleSearchChange}
                  cancelText="Clear"
                />
              </Col>
              <Col className="gutter-row" span={4}>
                <Button onClick={() => refetchEntities()}>Refetch</Button>
              </Col>
            </Row>
          </div>
          {loading ? <div className="textCenter">Loading data...</div> : ''}
          {!loading && error ? <div>{JSON.stringify(error.message)}</div> : ''}
          {!loading && !error && !data ? (
            <div className={styles.container}>
              <div className={styles.filters}>
                <div>
                  <div>
                    <span className={styles.subSearch}>Refine Results</span>
                    <SearchBar
                      placeholder="Part of..."
                      value={searchBlob}
                      onChange={handleSearchChange}
                      cancelText="Clear"
                    />
                  </div>
                  <div>
                    <div className="mtb10">
                      <Accordion
                        defaultActiveKey="0"
                        className={styles.myAccordion}
                      >
                        <Accordion.Panel header="Placeholder">
                          <List />
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </div>
                  <div>
                    <div className="mtb10">
                      <Accordion className={styles.myAccordion}>
                        <Accordion.Panel header="Languages">
                          <List />
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </div>
                  <div>
                    <div className="mtb10">
                      <Accordion className={styles.myAccordion}>
                        <Accordion.Panel header="Date">
                          <List />
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </div>
                  <div>
                    <div className="mtb10">
                      <Accordion className={styles.myAccordion}>
                        <Accordion.Panel header="Subjects">
                          <List />
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </div>
                  <div>
                    <div className="mtb10">
                      <Accordion className={styles.myAccordion}>
                        <Accordion.Panel header="People">
                          <List />
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </div>
                  <div>
                    <div className="mtb10">
                      <Accordion className={styles.myAccordion}>
                        <Accordion.Panel header="Places">
                          <List />
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </div>
                  <div>
                    <div className="mtb10">
                      <Accordion className={styles.myAccordion}>
                        <Accordion.Panel header="Partners">
                          <List />
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </div>
                  <div>
                    <div className="mtb10">
                      <Accordion className={styles.myAccordion}>
                        <Accordion.Panel header="Media Types">
                          <List />
                        </Accordion.Panel>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.entities}>
                <SearchSetting />
                <div className="textCenter">
                  Oops. We could not find what you were hoping for. Try changing
                  your queries oir help others find material related to the
                  query by annotating it.
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {!loading && !error && data && (
            <div className={styles.container}>
              <div className={styles.filters}>
                {data.searchCollections.pageInfo.filters !== null ? (
                  <div>
                    <div>
                      <span className={styles.subSearch}>Refine Results</span>
                      <SearchBar
                        placeholder="Part of..."
                        value={searchBlob}
                        onChange={handleSearchChange}
                        cancelText="Clear"
                      />
                    </div>
                    <div>
                      <div className="mtb10">
                        <Accordion
                          defaultActiveKey="0"
                          className={styles.myAccordion}
                        >
                          <Accordion.Panel header="Placeholder">
                            <List>
                              <List.Item>
                                <div>
                                  <div className="radioContent">
                                    <input
                                      type="radio"
                                      className="radioOpt"
                                      checked
                                    />
                                    Original Records(900)
                                  </div>
                                  <div className="radioContent">
                                    <input type="radio" className="radioOpt" />
                                    User Created(30)
                                  </div>
                                </div>
                              </List.Item>
                            </List>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    </div>
                    <div>
                      <div className="mtb10">
                        <Accordion className={styles.myAccordion}>
                          <Accordion.Panel header="Languages">
                            <List>
                              {data.searchCollections.pageInfo.filters.lang.map(
                                (x) => (
                                  <List.Item key={x.graphId}>
                                    {hLanguageFilter(
                                      x,
                                      filters[getKey('lang', x.graphId)],
                                      () => {
                                        dispatch({
                                          type: 'TOGGLE',
                                          payload: getKey('lang', x.graphId),
                                        });
                                      },
                                    )}
                                  </List.Item>
                                ),
                              )}
                            </List>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    </div>
                    <div>
                      <div className="mtb10">
                        <Accordion className={styles.myAccordion}>
                          <Accordion.Panel header="Date">
                            <List>
                              <List.Item>
                                <div className={styles.flexContainer}>
                                  <Flex>
                                    <Flex.Item>
                                      <Input
                                        className="dateInput"
                                        placeholder="2019"
                                      />
                                    </Flex.Item>
                                    <Flex.Item>
                                      <div className="alignRight">
                                        <Input
                                          className="dateInput"
                                          placeholder="2021"
                                        />
                                      </div>
                                    </Flex.Item>
                                  </Flex>
                                </div>
                              </List.Item>
                            </List>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    </div>
                    <div>
                      <div className="mtb10">
                        <Accordion className={styles.myAccordion}>
                          <Accordion.Panel header="Subjects">
                            <List>
                              {data.searchCollections.pageInfo.filters.subjects.map(
                                (x) => (
                                  <List.Item key={x.graphId}>
                                    {hSubjectFilter(
                                      x,
                                      filters[getKey('subjects', x.graphId)],
                                      () => {
                                        dispatch({
                                          type: 'TOGGLE',
                                          payload: getKey(
                                            'subjects',
                                            x.graphId,
                                          ),
                                        });
                                      },
                                    )}
                                  </List.Item>
                                ),
                              )}
                            </List>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    </div>
                    <div>
                      <div className="mtb10">
                        <Accordion className={styles.myAccordion}>
                          <Accordion.Panel header="People">
                            <List>
                              {data.searchCollections.pageInfo.filters.people.map(
                                (x) => (
                                  <List.Item key={x.graphId}>
                                    {hPersonFilter(
                                      x,
                                      filters[getKey('people', x.graphId)],
                                      () => {
                                        dispatch({
                                          type: 'TOGGLE',
                                          payload: getKey('people', x.graphId),
                                        });
                                      },
                                    )}
                                  </List.Item>
                                ),
                              )}
                            </List>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    </div>
                    <div>
                      <div className="mtb10">
                        <Accordion className={styles.myAccordion}>
                          <Accordion.Panel header="Places">
                            <List>
                              {data.searchCollections.pageInfo.filters.places.map(
                                (x) => (
                                  <List.Item key={x.graphId}>
                                    {hPlaceFilter(
                                      x,
                                      filters[getKey('places', x.graphId)],
                                      () => {
                                        dispatch({
                                          type: 'TOGGLE',
                                          payload: getKey('places', x.graphId),
                                        });
                                      },
                                    )}
                                  </List.Item>
                                ),
                              )}
                            </List>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    </div>
                    <div>
                      <div className="mtb10">
                        <Accordion className={styles.myAccordion}>
                          <Accordion.Panel header="Partners">
                            <List>
                              {data.searchCollections.pageInfo.filters.partners.map(
                                (x) => (
                                  <List.Item key={x.graphId}>
                                    {hPartnerFilter(
                                      x,
                                      filters[getKey('partners', x.graphId)],
                                      () => {
                                        dispatch({
                                          type: 'TOGGLE',
                                          payload: getKey(
                                            'partners',
                                            x.graphId,
                                          ),
                                        });
                                      },
                                    )}
                                  </List.Item>
                                ),
                              )}
                            </List>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                ) : (
                  'No Filters Found'
                )}
              </div>
              <div className={styles.entities}>
                <SearchSetting />
                <span className="catefont">Refined by:</span>
                {data.searchCollections.pageInfo.filters.lang
                  .filter((x) => filters[getKey('lang', x.graphId)])
                  .map((x) => (
                    <Badge
                      key={x.graphId}
                      style={badgeColors.lang}
                      text={`lang: ${x.displayName}`}
                    />
                  ))}
                {data.searchCollections.pageInfo.filters.subjects
                  .filter((x) => filters[getKey('subjects', x.graphId)])
                  .map((x) => (
                    <Badge
                      key={x.graphId}
                      style={badgeColors.subjects}
                      text={`subjects: ${x.label}`}
                    />
                  ))}
                {data.searchCollections.pageInfo.filters.partners
                  .filter((x) => filters[getKey('partners', x.graphId)])
                  .map((x) => (
                    <Badge
                      key={x.graphId}
                      style={badgeColors.partners}
                      text={`partners: ${x.displayName}`}
                    />
                  ))}
                {data.searchCollections.pageInfo.filters.people
                  .filter((x) => filters[getKey('people', x.graphId)])
                  .map((x) => (
                    <Badge
                      key={x.graphId}
                      style={badgeColors.people}
                      text={`people: ${x.displayName}`}
                    />
                  ))}
                {data.searchCollections.pageInfo.filters.places
                  .filter((x) => filters[getKey('places', x.graphId)])
                  .map((x) => (
                    <Badge
                      key={x.graphId}
                      style={badgeColors.places}
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
                        <>
                          <Link
                            key={node.graphId}
                            to={`/entities/${node.graphId}`}
                          >
                            <SearchCard
                              thumbnail={thumbnail}
                              node={node}
                              isDirectMatch={isDirectMatch}
                              annotationMatchCount={annotationMatchCount}
                            />
                          </Link>
                        </>
                      );
                    },
                  )
                ) : (
                  <div>No Records Found</div>
                )}
                <div className="paginationDiv textCenter">
                  <Pagination defaultCurrent={1} total={50} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer data={data} />
    </>
  );
};

export default Search;
