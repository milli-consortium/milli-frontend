const path = require(`path`);
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  console.log('44333')
  createPage({
    path: `/entities/:id`,
    matchPath: `/entities/:id`,
    component: path.resolve(`./src/pages/entity.tsx`),
  });
};
