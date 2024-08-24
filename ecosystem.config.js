module.exports = {
  apps: [
    {
      name: "uangqu-web",
      script: "./node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
