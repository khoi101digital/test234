
module.exports = {
  presets: ["@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "^@/(.+)": "./src/\\1",
        },
      },
    ],
    "react-native-worklets/plugin",
    ...(process.env.BABEL_ENV === 'production' || process.env.NODE_ENV === 'production'
      ? [['transform-remove-console', { exclude: ['error', 'warn'] }]]
      : []),
  ],
};

