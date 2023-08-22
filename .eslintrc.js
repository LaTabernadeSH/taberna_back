module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.js"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    indent: ["error", 2],
    "no-tabs": "off",
    "no-trailing-spaces": "error",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": "error",
  },
};
