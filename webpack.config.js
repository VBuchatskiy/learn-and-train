const path = require("path");

module.exports = {
  module: {
    resolve: {
      alias: {
        icons: path.resolve(__dirname, "node_modules/vue-material-design-icons")
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "/frontend/" : "/"
};
