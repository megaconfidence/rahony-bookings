module.exports = {
  globals: {
    fastify: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  env: {
    node: true,
  },
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:jest/recommended',
  ],
  plugins: ['prettier', 'jest'],
  rules: {
    camelcase: 'off',
    'promise/catch-or-return': 'error',
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
      },
    ],
  },
};
