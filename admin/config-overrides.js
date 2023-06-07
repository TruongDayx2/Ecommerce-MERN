module.exports = function override(config, env) {
    console.log("React app rewired works!")
    config.resolve.fallback = {
      fs: false,
      stream: false,
      child_process: false,
      https: require.resolve("https-browserify"),
      querystring: require.resolve("querystring-es3"),
      url: require.resolve("url"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
        http: require.resolve("stream-http"),
    //   os: require.resolve("os-browserify/browser"),
    //   stream: require.resolve("stream-browserify"),
    //     path: require.resolve("path-browserify"),
    //     util: require.resolve("util"),
    //     crypto: require.resolve("crypto-browserify"),
    //     zlib: require.resolve("browserify-zlib"),
    //     http: require.resolve("stream-http"),



    };
    return config;
  };