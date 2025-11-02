module.exports = [
  {
    ignores: ["node_modules/**"]
  },
  require("@eslint/js").configs.recommended,

  require("eslint-plugin-react").configs.flat.recommended,

  require("eslint-plugin-jest").configs["flat/recommended"],

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: require("@babel/eslint-parser"),
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: { jsx: true }
      },
      globals: require("eslint-plugin-react-native").environments["react-native"].globals
    },
    plugins: {
      react: require("eslint-plugin-react"),
      "react-native": require("eslint-plugin-react-native")
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off"
    }
  }
];