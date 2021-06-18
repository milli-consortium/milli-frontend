import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

const Container: React.FC<{ location: string }> = ({ children, location }) => (
  <main>
    <Header title={location} />
    <section className="container minHeight">{children}</section>
    <Footer />
  </main>
);

export default Container;
