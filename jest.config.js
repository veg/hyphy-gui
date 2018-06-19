module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    Home: "<rootDir>/src/components/home.jsx",
    NavBar: "<rootDir>/src/components/navbar.jsx",
    //BranchSelection:
    //  "<rootDir>/src/components/submittal_subcomponents/branch_selection.jsx",
    TreeBtnGroup:
      "<rootDir>/src/components/submittal_subcomponents/tree_btn_group.jsx",
    ParseAndValidateMSA:
      "<rootDir>/src/components/submittal_subcomponents/parse_and_validate_msa.jsx",
    //GetMSAPath:
    //  "<rootDir>/src/components/submittal_subcomponents/get_msa_path.jsx",
    ChooseGeneticCode:
      "<rootDir>/src/components/submittal_subcomponents/choose_genetic_code.jsx",
    ChooseAnalysisType:
      "<rootDir>/src/components/submittal_subcomponents/choose_analysis_type.jsx",
    //ChooseNumRateClasses:
    //  "<rootDir>/src/components/submittal_subcomponents/choose_num_rate_classes.jsx",
    //ChooseSiteRateVariation:
    //  "<rootDir>/src/components/submittal_subcomponents/choose_site_rate_variation.jsx",
    //ChooseSynRateVariation:
    //  "<rootDir>/src/components/submittal_subcomponents/choose_syn_rate_variation.jsx",
    AdvancedFubarOptions:
      "<rootDir>/src/components/submittal_subcomponents/advanced_fubar_options.jsx"
  },
  testPathIgnorePatterns: ["/node_modules/", "/hyphy-vision/"],
  collectCoverageFrom: [
    "**/src/**.{js,jsx}",
    "!**/node_modules/**",
    "!**/hyphy-vision/**",
    "!src/index.js"
  ]
};
