import React from 'react';
import PropTypes from 'prop-types';
import Seo from '@/components/Seo';
import MilliMenu from '@/components/MilliMenu';
import {
  GithubOutlined,
  TwitterOutlined,
  MediumCircleFilled,
} from '@ant-design/icons';

const Container = ({ children }) => (
  <main>
    <Seo />
    <header>
      <MilliMenu />
      <div className="header-line margin-auto" />
    </header>

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
          <a href="https://notabug.org/prasoon/niosx">Niosx</a> and
          <a href="https://www.gatsbyjs.org"> Gatsby</a>
        </div>
      </div>
    </footer>
  </main>
);

Container.defaultProps = {
  children: PropTypes.node,
};
export default Container;
