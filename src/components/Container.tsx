import React from 'react';
import {
  GithubOutlined,
  TwitterOutlined,
  MediumCircleFilled,
} from '@ant-design/icons';
import { Header } from './Header';

const Container: React.FC<{ location: string }> = ({ children, location }) => (
  <main>
    <Header title={location} />
    <section className="container">{children}</section>
    <footer>
      <div className="container">
        <div className="logo">M1ll1</div>

        <div className="contact">
          <div>Contact</div> <br />
          hello@milli.link
        </div>

        <div className="social">
          <GithubOutlined />
          <MediumCircleFilled />
          <TwitterOutlined />
        </div>

        <div className="copyright">
          © {new Date().getFullYear()}, All Rights Reserved. Built with{' '}
          <a href="https://notabug.org/prasoon/niosx">Niosx</a>
          <span> and </span>
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </div>
    </footer>
  </main>
);

export default Container;
