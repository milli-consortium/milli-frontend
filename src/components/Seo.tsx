import React from 'react';
import { Helmet } from 'react-helmet';

// to had page metadata
const Seo = () => (
  <>
    <Helmet>
      {/* General tags */}
      <title>Milli</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Milli is a consortium of archives in India."
      />
      <meta name="image" content="some img.jpg" />
    </Helmet>
  </>
);

export default Seo;
