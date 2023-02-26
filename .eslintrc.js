module.exports = {
  "parser": '@typescript-eslint/parser',
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/prettier"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ]
}