import React from 'react';
import * as styles from '../styles/search.module.css';
import '../styles/search.css';
import { dateFormat } from '../utils/fomart';
import { Button, Card, Flex } from 'antd-mobile';
import { RightOutlined } from '@ant-design/icons';

const SearchCard = ({
  node,
  thumbnail,
  isDirectMatch,
  annotationMatchCount,
}) => {
  const defaultImage =
    'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';

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
                      <img src={defaultImage} className={styles.imageCard} />
                    )}
                  </div>
                  <div className={styles.width60}>
                    <h2>{node.title}</h2>
                    <h4>Partner : {node.title}</h4>
                    <h4>
                      Subject :
                      {node.subjects &&
                        node.subjects.map((item, index) => (
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
