// eslint.config.js
module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**"],
    rules: {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"]
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
  },
];
