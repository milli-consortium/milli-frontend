/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-plugin-ts`,
      options: {
        tsLoader: {
          logLevel: 'warn'
        },
        forkTsCheckerPlugin: {
          eslint: true
        },
        fileName: `types/graphql-types.ts`,
        codegen: true,
        codegenDelay: 250,
        alwaysCheck: false
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GitHub',
        fieldName: 'github',
        url: 'https://api.github.com/graphql',
        // HTTP headers
        headers: {
          // Learn about environment variables: https://gatsby.dev/env-vars
          Authorization: `Bearer ${process.env.GITHUB_AUTH}`
        }
      }
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        stages: ['develop'],
        extensions: ['js', 'ts', 'tsx'],
        exclude: ['node_modules', '.cache', 'public']
        // Any eslint-webpack-plugin options below
      }
    }
  ]
}
