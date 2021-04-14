import React from 'react';
import { PageProps } from 'gatsby';
import Container from '@/components/Container';
import Title from '@/components/Title';
import HeroSlides from '@/components/HeroSlides';

const TestHome: React.FC<PageProps> = () => (
  <Container location="home" title="milli">
    <Title />

    <HeroSlides />
  </Container>
);

export default TestHome;
