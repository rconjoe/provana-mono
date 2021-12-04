module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    public: '0.0.0.0:8081'
  }
}
