import React from 'react';
import PropTypes from 'prop-types';
import Seo from '@/components/Seo';
import MilliMenu from '@/components/Menu';

const Container = ({ children }) => (
  <main className="container">
    <Seo />
    <header>
      <MilliMenu />
    </header>

    <section>{children}</section>
    <footer>
      © {new Date().getFullYear()}, Built with{' '}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  </main>
);

Container.defaultProps = {
  children: PropTypes.node,
};
export default Container;
