import React from 'react';
import { Flex } from 'antd-mobile';
import '../styles/search.css';
import { Link } from 'gatsby';
import * as styles from '../styles/search.module.css';

export const Footer = ({data}) => (
  <div className={!data ? "positionFixed footerDiv margin-auto" : "positionStatic footerDiv margin-auto"}>
    <div className={styles.flexContainer}>
      <Flex>
          <Flex.Item>
            <Link to="/"><div className="logo margin-auto">M1ll1</div></Link>
          </Flex.Item>
          <Flex.Item>
            <h4>Contact</h4>
            <Link to="#"><h3 className="linkColor">hello@milli.link</h3></Link>
          </Flex.Item>
          <Flex.Item>
            <Link to="https://github.com/"><div className="fleft github"></div></Link>
            <Link to="https://gmail.com/"><div className="fleft gmail"></div></Link>
            <Link to="https://twitter.com/"><div className="fleft twitter"></div></Link>
          </Flex.Item>
          <Flex.Item><h4>© All Rights Reserved. Made with ❤️</h4></Flex.Item>
      </Flex>
    </div>
  </div>
);
