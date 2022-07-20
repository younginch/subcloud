module.exports = {
  extends: ["airbnb", "airbnb-typescript", "next/core-web-vitals", "prettier"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  rules: {
    "react/jsx-props-no-spreading": "off",
    "no-underscore-dangle": "off",
    "react/require-default-props": "off",
    "no-nested-ternary": "off",
    "react/jsx-no-bind": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/no-shadow": "off",
    "jsx-a11y/aria-role": "off",
  },
};
