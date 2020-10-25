module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "semi": [
      "error",
      "always"
    ],
    "arrow-parens": [
      2,
      "as-needed"
    ]
  }
};
