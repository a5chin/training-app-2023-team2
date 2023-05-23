module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'import/extensions': [
      // importのときに以下の拡張子を記述しなくてもエラーにしない
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    // 関数の型宣言のパラメータに対して no-unused-vars を適用しないようにする
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    // ChakraUI や React-Hook-Form でSpread演算子使いたい
    "react/jsx-props-no-spreading": ["error", {custom: "ignore"}],
    // aspida の関数にアンダースコアが存在するため許容
    'no-underscore-dangle': 'off',
    // Functional Component は defaultProps がないので対応できない。 defaultArguments で賄う。
    "react/require-default-props": [0, {functions: "defaultArguments"}]
  },
};
