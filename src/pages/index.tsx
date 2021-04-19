import React from 'react';
import { PageProps } from 'gatsby';
import Container from '@/components/Container';
import HeroSlides from '@/components/HeroSlides';

const Index: React.FC<PageProps> = () => (
  <Container location="home" title="milli">
    <HeroSlides />

    <div className="about">
      <p>
        Milli is a consortium of individuals and communities interested in the
        nurturing of archives. Archives enable diverse stories. This aim guides
        the work of the consortium, the purpose, form and content of an archive,
        and what environments it could nourish in the future.
      </p>

      <h3>What Milli Offers</h3>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus
        ligula, semper sit amet facilisis id, lobortis id elit. Cras ac dui
        volutpat, vehicula risus id, volutpat tellus. Maecenas quis sodales
        orci. Maecenas ut scelerisque lacus, id convallis lectus. Praesent
        dictum faucibus augue, sed pretium neque eleifend id. Praesent
        dignissim.
      </p>
    </div>
  </Container>
);

export default Index;
