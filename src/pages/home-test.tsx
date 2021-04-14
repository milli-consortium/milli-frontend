import React from 'react';
import { PageProps } from 'gatsby';
import Container from '@/components/Container';
import Title from '@/components/Title';

const TestHome: React.FC<PageProps> = () => (
  <Container location="home" title="milli">
    <Title />
  </Container>
);

export default TestHome;
