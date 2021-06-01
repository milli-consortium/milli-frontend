import { Flex } from 'antd-mobile';
import { Link } from 'gatsby';
import React from 'react';
import '../styles/search.css';
import * as styles from '../styles/search.module.css';

export const Footer = ({data}) => (
  <div className={!data ? "positionFixed footerDiv margin-auto" : "positionStatic footerDiv margin-auto"}>
    <div className={styles.flexContainer}>
      <Flex>
        <Flex.Item>
          <Link to="/">
            <div className="logo margin-auto">M1ll1</div>
          </Link>
        </Flex.Item>
        <Flex.Item>
          <h4>Contact</h4>
          <a href="mailto:hello@milli.link">
            <h3 className="linkColor">hello [at] milli [dot] link</h3>
          </a>
        </Flex.Item>
        <Flex.Item>
          <Link to="https://github.com/">
            <div className="fleft github" />
          </Link>
          <Link to="https://gmail.com/">
            <div className="fleft gmail" />
          </Link>
          <Link to="https://twitter.com/">
            <div className="fleft twitter" />
          </Link>
        </Flex.Item>
        <Flex.Item>
          <h4>© All Rights Reserved. Made with ❤️</h4>
        </Flex.Item>
      </Flex>
    </div>
  </div>
);
