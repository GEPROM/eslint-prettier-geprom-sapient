module.exports = {
   extends: ["airbnb", "plugin:prettier/recommended", "prettier"],
   env: {
      browser: true,
      commonjs: true,
      es6: true,
      jest: true,
      node: true,
   },
   parser: "espree",
   parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
         jsx: true,
      },
   },
   globals: {
      DbCon: "readonly",
      DbQuery: "readonly",
      logger: "readonly",
   },
   rules: {
      camelcase: [
         "warn",
         {
            properties: "never",
            ignoreDestructuring: true,
            allow: ["^[a-z]+(_[a-z]+)*$", "^[a-zA-Z]+([A-Z][a-z]+)*$"],
         },
      ],
      "jsx-a11y/href-no-hash": ["off"],
      "react/jsx-filename-extension": [
         "warn",
         {
            extensions: [".js", ".jsx"],
         },
      ],
      "max-len": [
         "warn",
         {
            code: 100,
            tabWidth: 2,
            comments: 100,
            ignoreComments: false,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
         },
      ],
      "react/prop-types": [1],
      "no-unused-vars": [
         "warn",
         {
            argsIgnorePattern: "^_",
         },
      ],
   },
   settings: {
      react: {
         version: "detect",
      },
   },
};
