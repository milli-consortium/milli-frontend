import { NiosxData_searchCollections_edges_node } from '@/queries/types/NiosxData';
import { ImageSize } from '@/types/graphql-global-types';
import { RightOutlined } from '@ant-design/icons';
import { Button, Card, Flex } from 'antd-mobile';
import React from 'react';
import '../styles/search.css';
import * as styles from '../styles/search.module.css';
import { dateFormat } from '../utils/format';

type SearchProps = {
  node: NiosxData_searchCollections_edges_node;
  isDirectMatch: boolean;
  annotationMatchCount: number | null;
};

const SearchCard = (props: SearchProps) => {
  const { node, isDirectMatch, annotationMatchCount } = props;
  const defaultImage =
    'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';

  const thumbnail = node.images.find((i) => i.size === ImageSize.SMALL);

  return (
    <div className="cardHeight">
      <div className={styles.flexContainer}>
        <Flex>
          <Flex.Item>
            <div className={styles.width75}>
              <Card>
                <Card.Body>
                  <div className={styles.width40}>
                    {thumbnail ? (
                      <img
                        src={thumbnail.src}
                        alt={thumbnail.alt}
                        className={styles.imageCard}
                      />
                    ) : (
                      <img
                        src={defaultImage}
                        alt="placeholder"
                        className={styles.imageCard}
                      />
                    )}
                  </div>
                  <div className={styles.width60}>
                    <h2>{node.title}</h2>
                    <h4>Partner : {node.title}</h4>
                    <h4>
                      Subject :
                      {node.subjects &&
                        node.subjects.map((item, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <span className="mr10" key={index}>
                            {item},
                          </span>
                        ))}
                    </h4>
                    <h4>Date : {dateFormat(node.dateOfCreation)}</h4>
                    Your search matched {isDirectMatch
                      ? 'this object and'
                      : ''}{' '}
                    {annotationMatchCount > 0
                      ? `${annotationMatchCount} annotations ${
                          isDirectMatch ? 'on it' : 'on this object'
                        }`
                      : ''}
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className={styles.width25}>
              <Button className="rightOpt textLeft">
                <RightOutlined />
                Objective Identity
              </Button>
              <Button className="rightOpt textLeft">
                <RightOutlined />
                Access Points
              </Button>
              <Button className="rightOpt textLeft">
                <RightOutlined />
                About the Object
              </Button>
              <Button className="rightOpt textLeft">
                <RightOutlined />
                Object Format Data
              </Button>
              <Button className="rightOpt textLeft">
                <RightOutlined />
                Annotation
              </Button>
            </div>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  );
};

export default SearchCard;
