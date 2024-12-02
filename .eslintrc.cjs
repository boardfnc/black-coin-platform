/** @type {import('eslint').Linter.Config} */

module.exports = {
  extends: ['plugin:@next/next/core-web-vitals', 'next/typescript', 'prettier'],
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks', '@next/next'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    'import/consistent-type-specifier-style': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index'], ['object', 'type']],
        pathGroups: [
          {
            pattern: 'next/*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'app/*',
            group: 'internal',
          },
          {
            pattern: 'assets/*',
            group: 'internal',
          },
          {
            pattern: 'components/*',
            group: 'internal',
          },
          {
            pattern: 'constants/*',
            group: 'internal',
          },
          {
            pattern: 'hooks/*',
            group: 'internal',
          },
          {
            pattern: 'services/*',
            group: 'internal',
          },
          {
            pattern: 'store/*',
            group: 'internal',
          },
          {
            pattern: 'styles/*',
            group: 'internal',
          },
          {
            pattern: 'utils/*',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    curly: ['error', 'multi-line', 'consistent'],
    'no-var': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false,
      },
    ],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    radix: ['error', 'always'],
    'no-unneeded-ternary': [
      'error',
      {
        defaultAssignment: true,
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'SwitchStatement',
        message: 'There are many alternatives to `switch`.',
      },
    ],
    'no-unsafe-optional-chaining': [
      'error',
      {
        disallowArithmeticOperators: true,
      },
    ],
    'no-fallthrough': [
      'error',
      {
        commentPattern: 'falls? ?through',
      },
    ],
    'default-case': [
      'error',
      {
        commentPattern: '^no default$',
      },
    ],
    'no-nested-ternary': 'error',
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'prefer-numeric-literals': 'error',
    'no-dupe-else-if': 'error',
    'no-dupe-keys': 'error',
    'no-octal': 'error',
    'one-var': ['error', 'never'],
    'prefer-exponentiation-operator': 'error',
    'object-shorthand': [
      'error',
      'always',
      {
        avoidQuotes: false,
        ignoreConstructors: true,
        avoidExplicitReturnArrows: true,
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: false,
      },
    ],
    'no-multi-assign': [
      'error',
      {
        ignoreNonDeclaration: false,
      },
    ],
    'no-multi-str': 'error',
    'no-useless-return': 'error',
    'no-with': 'error',
    'no-labels': [
      'error',
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    'no-void': [
      'error',
      {
        allowAsStatement: false,
      },
    ],
    'prefer-object-spread': 'error',
    'prefer-object-has-own': 'error',
    'prefer-spread': 'error',
    yoda: [
      'error',
      'never',
      {
        exceptRange: true,
      },
    ],
    'no-floating-decimal': 'error',
    'no-constant-binary-expression': 'error',
    'no-octal-escape': 'error',

    // Replace 'camelcase' rule with '@typescript-eslint/naming-convention'
    camelcase: 'off',
    /**
     * The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings.
     * However, the existing `no-underscore-dangle` rule already takes care of this.
     */
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowSingleOrDouble',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowSingleOrDouble',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowSingleOrDouble',
      },
    ],

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true,
        // TODO: On added https://github.com/typescript-eslint/typescript-eslint/issues/5324
        // allowNamedExports: false,
        enums: true,
        typedefs: true,
        ignoreTypeReferences: true,
      },
    ],

    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',

    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': 'error',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': [
      'error',
      {
        builtinGlobals: true,
        ignoreDeclarationMerge: true,
      },
    ],

    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
        enforceForJSX: false,
      },
    ],

    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',

    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: false,
        ignoreProperties: false,
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': [
      'off',
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: true,
        allowNullableBoolean: true,
        allowNullableString: true,
        allowNullableNumber: true,
        allowAny: false,
        allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
      },
    ],

    'import/prefer-default-export': 'off',
    'import/no-relative-packages': 'error',
    'import/export': 'error',
    'import/no-cycle': [
      'error',
      {
        maxDepth: Infinity,
        ignoreExternal: false,
        allowUnsafeDynamicCyclicDependency: false,
      },
    ],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
        commonjs: false,
      },
    ],
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: false, // The true value here is for backward compatibility
        allowLiteral: false,
        allowObject: true,
      },
    ],
    'import/newline-after-import': [
      'error',
      {
        count: 1,
        // TODO: On released https://github.com/import-js/eslint-plugin-import/commit/995c12c80016e9d2cc5b3026884c34b5d4b1ad13
        // considerComments: true,
      },
    ],
    'import/first': 'error',

    // TODO: If the core ESLint version is good enough (i.e. you're not using Flow and you are using import/extensions), keep it and don't use this.
    'no-duplicate-imports': 'off',
    'import/no-duplicates': [
      'error',
      {
        considerQueryString: true,
      },
    ],

    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image'],
      },
    ],
    'jsx-a11y/no-noninteractive-element-interactions': [
      'error',
      {
        handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
      },
    ],
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
        depth: 25,
      },
    ],
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',

    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',

    '@next/next/no-img-element': 'error',
    'react/forbid-elements': ['error', { forbid: [] }],

    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
        custom: 'ignore',
        explicitSpread: 'enforce',
        // Dummy
        exceptions: ['asdfqwer'],
      },
    ],
    'react/display-name': [
      'error',
      {
        ignoreTranspilerName: false,
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'always',
        children: 'never',
        propElementValues: 'always',
      },
    ],
    'react/no-unused-prop-types': 'error',
    'react/no-array-index-key': 'warn',
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/destructuring-assignment': [
      'off',
      'always',
      {
        ignoreClassFields: true,
        destructureInSignature: 'ignore',
      },
    ],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.mts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.mjs', '.js', 'jsx', '.json', '.ts', '.mts', '.tsx', '.d.ts'],
      },
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.mts', '.tsx', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },
};
