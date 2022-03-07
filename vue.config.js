const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: {
  //   resolve: {
  //     fallback: [
  //       { alias: require.resolve("crypto-browserify"), name: "crypto" },
  //       { alias: require.resolve("stream-browserify"), name: "stream" },
  //     ],
  //   },
  // },
});
