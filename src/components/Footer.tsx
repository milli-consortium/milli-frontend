import { Link } from 'gatsby';
import React from 'react';
import {
  GithubOutlined,
  TwitterOutlined,
  MediumCircleFilled,
} from '@ant-design/icons';

export const Footer = () => (
  <footer className="positionFixed footerDiv">
    <div className="container">
      <div className="logo">M1ll1</div>

      <div className="contact">
        <div>Contact</div> <br />
        hello@milli.link
      </div>

      <div className="social">
        <Link
          to="https://github.com/milli-consortium/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ border: 'none' }}
        >
          <GithubOutlined />
        </Link>
        <Link
          to="https://medium.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ border: 'none' }}
        >
          <MediumCircleFilled />
        </Link>
        <Link
          to="https://twitter.com/archivesmilli"
          target="_blank"
          rel="noopener noreferrer"
          style={{ border: 'none' }}
        >
          <TwitterOutlined />
        </Link>
      </div>

      <div className="copyright">
        © {new Date().getFullYear()}, All Rights Reserved. Built with{' '}
        <a href="https://notabug.org/prasoon/niosx">Niosx</a>
        <span> and </span>
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </div>
  </footer>
);
