const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

exports.onCreatePage = async ({ page, actions}) => {
  const { createPage } = actions

  if(page.path.match(/^\/tournaments/)){
    createPage({
      path: "tournament",
      matchPath: "/tournament/*",
      component: path.resolve(`src/components/TournamentRouting.tsx`)
    })
  }
}
