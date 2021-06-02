import { RightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { Button } from 'antd-mobile';
import React from 'react';
import '../styles/search.css';
import { dateFormat } from '../utils/format';

// TODO: add types
const SearchCard = ({
  node,
  thumbnail,
  isDirectMatch,
  annotationMatchCount,
}) => {
  const defaultImage =
    'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';

  return (
    <div className="cardHeight mycard">
      <Row gutter={16}>
        <Col className="gutter-row" span={4}>
          {thumbnail ? (
            <img
              src={thumbnail.src}
              alt={thumbnail.alt}
              className="imageCard"
            />
          ) : (
            <img alt="placeholder" src={defaultImage} className="imageCard" />
          )}
        </Col>
        <Col className="gutter-row" span={16}>
          <h2>{node.title}</h2>
          <h4>Partner : {node.partner}</h4>
          <h4>
            Subject :
            {node.subjects &&
              node.subjects.map((item) => (
                <span className="mr10" key={item.graphId}>
                  {item},
                </span>
              ))}
          </h4>
          <h4>Date : {dateFormat(node.dateOfCreation)}</h4>
          Your search matched {isDirectMatch ? 'this object and' : ''}{' '}
          {annotationMatchCount > 0
            ? `${annotationMatchCount} annotations ${
                isDirectMatch ? 'on it' : 'on this object'
              }`
            : ''}
        </Col>
        <Col className="gutter-row" span={4}>
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
        </Col>
      </Row>
    </div>
  );
};

export default SearchCard;
