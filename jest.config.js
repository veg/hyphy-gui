module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    Home: "<rootDir>/src/components/home.jsx",
    NavBar: "<rootDir>/src/components/navbar.jsx",
    BranchSelection:
      "<rootDir>/src/components/submittal_subcomponents/branch_selection.jsx"
  },
  testPathIgnorePatterns: ["/node_modules/", "/hyphy-vision/"],
  collectCoverageFrom: [
    "**/src/**.{js,jsx}",
    "!**/node_modules/**",
    "!**/hyphy-vision/**",
    "!src/index.js"
  ]
};
