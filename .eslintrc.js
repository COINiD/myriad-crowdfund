module.exports = {
  parser: 'babel-eslint',
  rules: {
    strict: 0,
    'react/prop-types': 0,
  },
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  env: {
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['gatsby-*.js'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2015,
      },
      env: {
        browser: false,
        node: true,
        es6: true,
      },
    },
  ],
  settings: {
    react: {
      version: '16.10',
    },
  },
}
