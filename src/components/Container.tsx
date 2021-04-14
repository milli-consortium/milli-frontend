import React from 'react';
import Seo from '@/components/Seo';
import MilliMenu from '@/components/Menu';

const Container = () => (
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

export default Container;
