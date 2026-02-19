# @geprom/eslint-prettier-sapient

ESLint and Prettier configuration for Geprom Sapient projects with support for both camelCase and snake_case naming conventions.

## Installation

```bash
npm install --save-dev @geprom/eslint-prettier-sapient eslint prettier
```

## Usage

Create an `.eslintrc.js` file in your project root:

```javascript
module.exports = {
  extends: ['@geprom/eslint-prettier-sapient'],
};
```

Create a `.prettierrc.js` file in your project root:

```javascript
module.exports = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  arrowParens: 'always',
};
```

Add scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## Features

- ✅ Airbnb ESLint ruleset
- ✅ Prettier integration
- ✅ Both camelCase and snake_case naming support
- ✅ Preconfigured globals: `DbCon`, `DbQuery`, `logger`

## Configuration Details

### Supported Naming Conventions

Both naming styles are accepted without warnings:

- `someFunction` (camelCase)
- `some_function` (snake_case)

### Application Globals

These globals are pre-declared and don't require imports, any additional global variable available in Sapient should :

- `DbCon` - Database connection class
- `DbQuery` - Database query class
- `logger` - Logger instance

To extend with additional globals:

```javascript
module.exports = {
  extends: ['@geprom/eslint-prettier-sapient'],
  globals: {
    myCustomGlobal: 'readonly',
  },
};
```

### ESLint Rules

- **camelcase**: Flexible naming - accepts both camelCase and snake_case patterns
- **jsx-a11y/href-no-hash**: Disabled
- **react/jsx-filename-extension**: Warns for .js files (allows .jsx)
- **max-len**: 100 character limit with exceptions for comments, URLs, and strings
- **react/prop-types**: Warning level
- **no-unused-vars**: Ignores variables starting with underscore

### Prettier Options

- **printWidth**: 100 characters
- **singleQuote**: true
- **trailingComma**: 'es5'
- **bracketSpacing**: true
- **semi**: true
- **useTabs**: false
- **tabWidth**: 2 spaces
- **arrowParens**: 'always'

## Extending the Configuration

You can extend or override rules in your project's `.eslintrc.js`:

```javascript
module.exports = {
  extends: ['@geprom/eslint-prettier-sapient'],
  rules: {
    'max-len': ['warn', { code: 120 }], // Override max line length
    'no-console': 'warn', // Add custom rule
  },
};
```