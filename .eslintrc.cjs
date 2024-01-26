module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "no-undef": "off",  // tailwind.confi 버그
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true
      },
    ],
  },
}
