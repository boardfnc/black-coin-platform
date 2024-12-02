/** @type {import("prettier").Options} */

const config = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'always',
  rangeStart: 0,
  rangeEnd: Infinity,
  filepath: 'none',
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'strict',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
};

export default config;
