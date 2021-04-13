const fs = require('fs');
const { buildSchema } = require('graphql');

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Milli`,
  },
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './.cache/fragments/*.ts',
          './node_modules/gatsby-*/**/*.ts',
        ],
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Niosx',
        fieldName: 'niosx',
        url: 'http://localhost:9002/graphql',
        createSchema: async () => {
          const sdl = fs.readFileSync(`${__dirname}/schema.sdl`).toString();
          return buildSchema(sdl);
        },
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-antd-mobile',
      options: {
        style: true
      }
    },
  ],
};
