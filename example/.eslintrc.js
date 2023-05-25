module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    curly: 'off',
    'comma-dangle': 'off',
    'react/no-unstable-nested-components': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'eslint-plugin-ft-flow': 'off',
        'no-shadow': 'off',
        'no-undef': 'off'
      }
    },
    {
      files: ['*.js', '*.ts', '*.tsx'],
      rules: {
        'import/no-named-as-default': 'off',
        'import/default': 'off'
      }
    }
  ]
};
