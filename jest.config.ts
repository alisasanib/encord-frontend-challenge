const config = {
  preset: "ts-jest",
  testEnvironment:
    "jest-environment-jsdom",
  transform: {
    ".+\\.(css|styl|less|sass|scss|svg)$":
      "jest-css-modules-transform",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$":
      "<rootDir>/test/__ mocks __/fileMock.js",
  },
};

export default config;
