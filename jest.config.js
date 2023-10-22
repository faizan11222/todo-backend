module.exports = {
  testMatch: ["**/__tests__/**/*.test.js"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  testTimeout: 10000,
};
