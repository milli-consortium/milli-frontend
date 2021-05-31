import React from 'react';
import { Flex } from 'antd-mobile';
import * as styles from '../styles/search.module.css';
import '../styles/search.css';
import { Link } from 'gatsby';

const gmail =
  '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Gmail</title><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>';

export const Footer = () => (
  <div className="footerDiv margin-auto">
    <div className={styles.flexContainer}>
      <Flex>
        <Flex.Item>
          <Link to="/">
            <div className="logo margin-auto">M1ll1</div>
          </Link>
        </Flex.Item>
        <Flex.Item>
          <h4>Contact</h4>
          <Link to="#">
            <h3 className="linkColor">hello@milli.link</h3>
          </Link>
        </Flex.Item>
        <Flex.Item>
          <Link to="https://github.com/">
            <div className="fleft github"></div>
          </Link>
          <Link to="https://gmail.com/">
            <div className="fleft gmail"></div>
          </Link>
          <Link to="https://twitter.com/">
            <div className="fleft twitter"></div>
          </Link>
        </Flex.Item>
        <Flex.Item>
          <h4>© All Rights Reserved. Made with ❤️</h4>
        </Flex.Item>
      </Flex>
    </div>
  </div>
);
