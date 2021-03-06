module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ["react-app", "eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
  rules: {},
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "no-debugger": "warn",
      },
    },
  ],
};
