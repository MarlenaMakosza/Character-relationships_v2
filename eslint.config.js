// @ts-nocheck — config file, many ESLint plugins lack type declarations
import cspell from '@cspell/eslint-plugin';
import js from '@eslint/js';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import html from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import prettier from 'eslint-config-prettier';
import drizzle from 'eslint-plugin-drizzle';
import esEs from 'eslint-plugin-eslint-plugin';
import functional from 'eslint-plugin-functional';
import esImport from 'eslint-plugin-import';
import alias from 'eslint-plugin-import-alias';
import node from 'eslint-plugin-n';
import perfectionist from 'eslint-plugin-perfectionist';
import promise from 'eslint-plugin-promise';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import svelte from 'eslint-plugin-svelte';
import tsDoc from 'eslint-plugin-tsdoc';
import unicorn from 'eslint-plugin-unicorn';
import { fileURLToPath } from 'node:url';
import svelteParser from 'svelte-eslint-parser';

// IMPORTANT! If you want see what rules is in use, just run in terminal: npx @eslint/config-inspector
// For most plugins you can check their docs via this tool

// Toggles for enabling/disabling rule groups
const aliasFlag = true; // Checked
const cspellFlag = true; // Checked
const drizzleFlag = true; // Checked
const esEsFlag = true; // Checked
const esImportFlag = true; // Checked
// Recommend when you only use functional programming, or you have separate space for functional code in project
const functionalFlag = false;
const htmlFlag = true; // Checked
const jsFlag = true; // Checked
const jsonFlag = true; // Checked
const markdownFlag = true; // Checked
const nodeFlag = true; // Checked
const perfectionistFlag = true; // Checked
// "Turns off all rules that are unnecessary or might conflict with Prettier." (most from stylistic)
const prettierFlag = true; // Checked
const promiseFlag = true; // Checked
const securityFlag = true; // Checked
const sonarjsFlag = true; // Checked
const stylisticFlag = true; // Checked
const svelteFlag = true; // Checked
const tsDocFlag = true; // Checked
const typescriptFlag = true; // Checked
const unicornFlag = true; // Checked
const vitestFlag = true; // Checked (almost, I check it when I write tests, I promise)

// const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default [
  prettier,
  {
    name: 'Main ruleset',
    files: ['**/*.{ts,tsx,js,jsx,cjs,mjs,svelte}'],
    ignores: [
      'node_modules',
      'node_modules/**',
      'build',
      '.svelte-kit/**',
      'svelte.config.js',
      'vite.config.ts',
      'eslint.config.js',
      'drizzle.config.ts',
      'commitlint.config.js',
      'src/routes/sandbox/**',
      'src/routes/debug/**',
      'tsconfig.json',
      'docs/**',
    ],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        project: './tsconfig.json',
        extraFileExtensions: ['.svelte'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      '@stylistic': stylistic,
      tsDoc: tsDoc,
      unicorn: unicorn,
      svelte: svelte,
      perfectionist: perfectionist,
      js: js,
      functional: functional,
      sonarjs: sonarjs,
      promise: promise,
      drizzle: drizzle,
      import: esImport,
      security: security,
      alias: alias,
      node: node,
      cspell: cspell,
      vitest: vitest,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...(cspellFlag && {
        'cspell/spellchecker': 'warn',
      }),
      ...(nodeFlag && {
        'node/callback-return': 'error',
        'node/exports-style': ['error', 'exports'],
        'node/global-require': 'error',
        'node/handle-callback-err': 'error',
        'node/hashbang': 'error',
        'node/no-callback-literal': 'error',
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-extraneous-import': 'error',
        'node/no-extraneous-require': 'error',
        'node/no-missing-require': 'error',
        'node/no-mixed-requires': 'error',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/no-sync': 'warn',
        'node/no-unpublished-bin': 'error',
        'node/no-unpublished-import': 'error',
        'node/no-unpublished-require': 'error',
        'node/no-unsupported-features/es-builtins': 'error',
        'node/no-unsupported-features/es-syntax': 'error',
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/console': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-global/text-decoder': ['error', 'always'],
        'node/prefer-global/text-encoder': ['error', 'always'],
        'node/prefer-global/url': ['error', 'always'],
        'node/prefer-global/url-search-params': ['error', 'always'],
        'node/prefer-node-protocol': 'error',
        'node/prefer-promises/dns': 'error',
        'node/prefer-promises/fs': 'error',
        'node/process-exit-as-throw': 'error',

        // Possible useless
        'node/no-unsupported-features/node-builtins': 'off',
        'node/no-restricted-import': 'off',
        'node/no-restricted-require': 'off',
        'node/no-missing-import': 'off',
        'node/no-hide-core-modules': 'off', // deprecated
        'node/no-process-env': 'off',
        'node/no-process-exit': 'off',
        'node/file-extension-in-import': 'off',
      }),
      /* Svelte rules */
      ...(svelteFlag && {
        // svelte.configs.recommended and .prettier are FlatConfig[] arrays in v3.x — merge rules from all entries
        ...Object.assign({}, ...svelte.configs.recommended.map(c => c.rules ?? {})),
        ...Object.assign({}, ...svelte.configs.prettier.map(c => c.rules ?? {})),
        // Possible Errors
        'svelte/infinite-reactive-loop': 'error',
        'svelte/no-dom-manipulating': 'error',
        'svelte/no-dupe-on-directives': 'error',
        'svelte/no-dupe-use-directives': 'error',
        'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
        'svelte/no-reactive-reassign': 'error',
        'svelte/no-store-async': 'error',
        'svelte/require-store-callbacks-use-set-param': 'error',
        'svelte/require-store-reactive-access': 'error',
        'svelte/valid-prop-names-in-kit-pages': 'error',
        'svelte/no-goto-without-base': 'off',

        // Security
        'svelte/no-target-blank': 'error',

        // Stylistic issues in svelte
        'svelte/derived-has-same-inputs-outputs': 'error',
        'svelte/first-attribute-linebreak': 'error',
        'svelte/html-closing-bracket-spacing': 'error',
        'svelte/html-quotes': 'error',
        'svelte/html-self-closing': 'error',
        'svelte/mustache-spacing': 'error',
        'svelte/no-extra-reactive-curlies': 'error',
        'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
        'svelte/prefer-class-directive': 'error',
        'svelte/prefer-style-directive': 'error',
        'svelte/shorthand-attribute': 'error',
        'svelte/shorthand-directive': 'error',
        'svelte/sort-attributes': 'error',
        'svelte/spaced-html-comment': 'error',
        'svelte/no-trailing-spaces': 'off', // Stylistic has same rule

        // Best Practices
        'svelte/no-useless-mustaches': 'error',
        'svelte/prefer-destructured-store-props': 'error',
        'svelte/require-each-key': 'error',
        'svelte/require-event-dispatcher-types': 'error',
        'svelte/require-optimized-style-attribute': 'error',
        'svelte/require-stores-init': 'error',
        'svelte/valid-each-key': 'error',
        'svelte/no-ignored-unsubscribe': 'error',
        'svelte/no-immutable-reactive-statements': 'error',
        'svelte/no-inspect': 'error',
        'svelte/no-reactive-functions': 'error',
        'svelte/no-reactive-literals': 'error',
        'svelte/no-svelte-internal': 'error',
        'svelte/no-unused-class-name': 'error',
        'svelte/block-lang': ['error', { script: ['ts'], style: 'css' }],
        'svelte/button-has-type': 'error',

        // Off
        'svelte/no-inline-styles': 'off',
        'svelte/indent': 'off',
        'svelte/max-attributes-per-line': 'off',
        'svelte/html-closing-bracket-new-line': 'off', // Collision with prettier
        'svelte/no-restricted-html-elements': 'off',
        // 'svelte/experimental-require-slot-types': 'error',
        // 'svelte/experimental-require-strict-events': 'off',
      }),

      /* promise rules */
      ...(promiseFlag && {
        'promise/always-return': 'error',
        'promise/no-return-wrap': 'error',
        'promise/param-names': 'error',
        'promise/catch-or-return': 'error',
        'promise/no-native': 'off',
        'promise/no-nesting': 'error',
        'promise/no-promise-in-callback': 'error',
        'promise/no-callback-in-promise': 'error',
        'promise/avoid-new': 'error',
        'promise/no-new-statics': 'error',
        'promise/no-return-in-finally': 'error',
        'promise/valid-params': 'error',
        'promise/no-multiple-resolved': 'error',
        'promise/prefer-await-to-callbacks': 'error',
        'promise/prefer-await-to-then': 'error',
        'promise/prefer-catch': 'error',
        'promise/spec-only': 'error',
      }),

      /* drizzle rules */
      ...(drizzleFlag && {
        'drizzle/enforce-delete-with-where': 'error',
        'drizzle/enforce-update-with-where': 'error',
      }),
      /* alias rules */
      ...(aliasFlag && {
        'alias/import-alias': [
          'error',
          {
            relativeDepth: 1,
            rootDir: import.meta.dirname,
            aliases: [
              { alias: '@src', matcher: '^src' }, // src/modules/app/test -> @src/modules/app/test
              { alias: '@routes', matcher: '^src/routes' }, // src/routes/modules/app/test -> @routes/modules/app/test
              { alias: '@test', matcher: '^test/unit' }, // test/unit/modules/app -> @test/modules/app
              { alias: '@testRoot', matcher: '^(test)/e2e' }, // test/e2e/modules/app -> @testRoot/e2e/modules/app
            ],
          },
        ],
      }),
      /* sonarjs rules */
      ...(sonarjsFlag && {
        ...sonarjs.configs.recommended.rules,
        'sonarjs/no-empty-test-file': 'off', // TODO TEMP
        'sonarjs/todo-tag': 'off', // TODO TEMP
        'sonarjs/no-commented-code': 'off', // TODO TEMP
        'sonarjs/no-return-type-any': 'error',
        'sonarjs/no-collapsible-if': 'error',
        'sonarjs/prefer-immediate-return': 'error',
        'sonarjs/no-duplicate-string': 'error',
        'sonarjs/nested-control-flow': 'error', // default: 3
        'sonarjs/elseif-without-else': 'error',
        'sonarjs/cyclomatic-complexity': 'error',
        'sonarjs/expression-complexity': 'error',
        'sonarjs/no-unused-function-argument': 'error',
        'sonarjs/operation-returning-nan': 'error',
        'sonarjs/non-number-in-arithmetic-expression': 'error',
        'sonarjs/no-require-or-define': 'error',
        'sonarjs/prefer-object-literal': 'error',
        'sonarjs/destructuring-assignment-syntax': 'error',
        'sonarjs/strings-comparison': 'error',
        'sonarjs/no-inconsistent-returns': 'error',
        'sonarjs/max-union-size': 'error',
        'sonarjs/bool-param-default': 'error',
        'sonarjs/values-not-convertible-to-numbers': 'error',
        'sonarjs/no-nested-incdec': 'error',
        'sonarjs/no-built-in-override': 'error',
        'sonarjs/no-incorrect-string-concat': 'error',
        'sonarjs/unicode-aware-regex': 'error',
        'sonarjs/no-nested-switch': 'error', // It may be necessary, then disable it
        'sonarjs/no-wildcard-import': 'error',
        'sonarjs/no-variable-usage-before-declaration': 'error',

        /* off rules */
        'sonarjs/file-name-differ-from-class': 'off',
        'sonarjs/comment-regex': 'off',
        'sonarjs/no-sonar-comments': 'off',
        'sonarjs/aws-iam-all-resources-accessible': 'off',
        'sonarjs/function-name': 'off',
        'sonarjs/variable-name': 'off',
        'sonarjs/max-lines': 'off',
        'sonarjs/max-lines-per-function': 'off',
        'sonarjs/file-header': 'off',
        'sonarjs/deprecation': 'off', // Rule doesn't work correctly
        'sonarjs/no-implicit-dependencies': 'off', // Disabled because SvelteKit aliases (e.g., `$lib`) and monorepos can cause false positives.
        'sonarjs/too-many-break-or-continue-in-loop': 'off', // Should not contain a break or continuation at all
        'sonarjs/for-in': 'off', // In Typescript more use 'for of' and we have rule for this
        'sonarjs/no-for-in-iterable': 'off', // In Typescript more use 'for of' and we have rule for this
        'sonarjs/array-constructor': 'off', // Is similar rule for one for TS
        'sonarjs/declarations-in-global-scope': 'off', // Useless for typescript, because typescript have scopes instead of javascript

        // possible problems
        'sonarjs/no-function-declaration-in-block': 'off', // In Svelte we often define functions in onMount or inside effects ($: ...).
        'sonarjs/no-undefined-assignment': 'off', // In TypeScript let x: string | undefined is correct and useful.
        'sonarjs/arguments-usage': 'off', // In TypeScript, you use rest parameters (...args), but arguments are sometimes needed.
        'sonarjs/arrow-function-convention': 'off', // TypeScript formatuje to automatycznie (Prettier/ESLint ma lepszą kontrolę nad tym).
        'sonarjs/class-prototype': 'off', // In TypeScript and Svelte prototype is rarely used – if someone uses it, it is done consciously
        'sonarjs/no-reference-error': 'off', // Possible problem when use 'console' od 'process'
        'sonarjs/shorthand-property-grouping': 'error',
      }),
      /* security rules */
      ...(securityFlag && {
        // 'security/detect-object-injection': 'error',
        ...security.configs.recommended.rules,
        'security/detect-unsafe-regex': 'error',
        'security/detect-non-literal-regexp': 'error',
        'security/detect-non-literal-require': 'error',
        'security/detect-non-literal-fs-filename': 'error',
      }),

      /* import rules */
      ...(esImportFlag && {
        'import/named': 'error',
        'import/default': 'error',
        'import/no-named-as-default': 'error',
        'import/no-anonymous-default-export': 'error',
        'import/no-duplicates': 'error',
        'import/no-absolute-path': 'error',
        'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

        // Useless
        'import/extensions': 'off',
        'import/no-restricted-paths': 'off',
        'import/order': 'off',
        'import/no-mutable-exports': 'off',
        'import/no-unresolved': 'off', //"If you're using a module bundler other than Node or Webpack, you may end up with a lot of false positive reports of missing dependencies."
        'import/no-extraneous-dependencies': 'off',
      }),
      /* functional rules */
      ...(functionalFlag && {
        // ...functional.configs.recommended.rules,
        ...functional.configs.all.rules,
        // 'functional/no-throw-statements': 'off',
        // 'functional/no-classes': 'off',
        // 'functional/no-return-void': 'off',
        // 'functional/prefer-immutable-types': 'off',
        // 'functional/functional-parameters': 'off',
        // 'functional/no-conditional-statements': 'off',
        // 'functional/no-let': 'off',
        // 'functional/no-expression-statements': 'off',
      }),

      /* Tsdoc */
      ...(tsDocFlag && {
        'tsDoc/syntax': 'warn',
      }),

      /* js rules */
      ...(jsFlag && {
        // ...js.configs.all.rules,
        // ...js.configs.recommended.rules,

        'constructor-super': 'error',
        'for-direction': 'error',
        'getter-return': 'error',
        'no-async-promise-executor': 'error',
        'no-class-assign': 'error',
        'no-compare-neg-zero': 'error',
        'no-cond-assign': ['error', 'always'],
        'no-const-assign': 'error',
        'no-constant-binary-expression': 'error',
        'no-constant-condition': 'error',
        'no-constructor-return': 'error',
        'no-control-regex': 'error',
        'no-debugger': 'error',
        'no-dupe-args': 'error',
        'no-dupe-else-if': 'error',
        'no-dupe-keys': 'error',
        'no-duplicate-case': 'error',
        'no-empty-character-class': 'error',
        'no-empty-pattern': 'error',
        'no-ex-assign': 'error',
        'no-fallthrough': 'error',
        'no-func-assign': 'error',
        'no-import-assign': 'error',
        'no-inner-declarations': ['error', 'both'],
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': [
          'error',
          {
            skipStrings: false,
            skipTemplates: false,
            skipJSXText: false,
          },
        ],
        'no-loss-of-precision': 'error',
        'no-misleading-character-class': 'error',
        'no-new-native-nonconstructor': 'error',
        'no-obj-calls': 'error',
        'no-prototype-builtins': 'error',
        'no-self-assign': 'error',
        'no-self-compare': 'error',
        'no-setter-return': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-this-before-super': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unreachable': 'error',
        'no-unsafe-finally': 'error',
        'no-unsafe-negation': [
          'error',
          {
            enforceForOrderingRelations: true,
          },
        ],
        'no-unsafe-optional-chaining': [
          'error',
          {
            disallowArithmeticOperators: true,
          },
        ],
        'no-unused-private-class-members': 'error',
        'no-useless-backreference': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',
        'func-names': ['error', 'never'],
        'no-bitwise': 'error',
        'no-case-declarations': 'error',
        'no-delete-var': 'error',
        'no-else-return': 'error',
        'no-empty': 'error',
        'no-empty-static-block': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-boolean-cast': [
          'error',
          {
            enforceForLogicalOperands: true,
          },
        ],
        'no-global-assign': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-invalid-this': [
          'error',
          {
            capIsConstructor: false,
          },
        ],
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-multi-assign': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-nonoctal-decimal-escape': 'error',
        'no-object-constructor': 'error',
        'no-octal': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-redeclare': 'error',
        'no-regex-spaces': 'error',
        'no-return-assign': ['error', 'always'],
        'no-script-url': 'error',
        'no-sequences': [
          'error',
          {
            allowInParentheses: false,
          },
        ],
        'no-shadow-restricted-names': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': [
          'error',
          {
            enforceForClassMembers: true,
          },
        ],
        'no-useless-concat': 'error',
        'no-useless-escape': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-with': 'error',
        'one-var': ['error', 'never'],
        'operator-assignment': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-const': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-spread': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'require-yield': 'error',
        'no-console': 'off', // TODO TEMP
        'func-name-matching': 'error',
        'accessor-pairs': 'error',
        'grouped-accessor-pairs': 'error',
        'prefer-exponentiation-operator': 'error',
        'no-unneeded-ternary': 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'guard-for-in': 'error',
        'no-unreachable-loop': 'error',
        'no-useless-assignment': 'error',
        'object-shorthand': 'error',
        curly: 'error',
        'no-unexpected-multiline': 'error',
        'no-await-in-loop': 'error',
        'prefer-regex-literals': 'error',
        'no-param-reassign': 'error',
        'no-restricted-syntax': ['error', 'WithStatement'],
        'max-depth': ['error', 4],
        'no-negated-condition': 'error',
        'new-cap': 'error',
        'prefer-object-has-own': 'error',
        radix: ['error', 'as-needed'],

        // Disable for some reason
        'no-continue': 'off',
        'max-nested-callbacks': 'off',
        'prefer-named-capture-group': 'off',
        yoda: 'off',
        'no-div-regex': 'off',
        'consistent-this': 'off', // TS check this better than eslint (supposedly)
        'no-extra-label': 'off',
        'no-label-var': 'off',
        'no-promise-executor-return': 'off',
        'no-restricted-exports': 'off',
        'no-restricted-globals': 'off',
        'no-restricted-properties': 'off',
        'sort-vars': 'off',
        'unicode-bom': 'off',
        'max-lines': 'off',
        'no-unused-labels': 'off', // In TypeScript? Where?
        'max-lines-per-function': 'off',
        'max-statements': 'off', // Irritating
        complexity: 'off', // Have in sonarjs
        'func-style': 'off',
        'require-atomic-updates': 'off', // TypeScript already warns about incorrect use of await.
        'no-void': 'off', // That's not error
        'no-undef-init': 'off',
        'no-multi-str': 'off', // TypeScript supports template literals – prohibiting \ makes no sense.
        'no-caller': 'off', // Old construct in JavaScript
        'no-iterator': 'off', // Old construct in JavaScript
        'symbol-description': 'off',
        'logical-assignment-operators': 'off',
        'id-denylist': 'off', // Useless
        'id-length': 'off',
        'id-match': 'off',
        eqeqeq: 'off', // For elastic equals like != null, disable null and undefined - for short code
        'no-eq-null': 'off',
        'no-duplicate-imports': 'off', // I allow to duplicate imports for separate import types and other parts
        'sort-keys': 'off', // Can be frustrating
        camelcase: 'off', // It may be disturbing
        'no-alert': 'off', // I use it (yet)
        'no-lonely-if': 'off', // I use it
        'no-ternary': 'off', // ternary is useful
        'no-nested-ternary': 'off', // Sometimes ternary within ternary is useful – a matter of style.
        'require-unicode-regexp': 'off', // not always use Unicode in regex
        'vars-on-top': 'off', // TS prefer let or const
        'arrow-body-style': 'off', // It's not always worth forcing {} in arrow functions.
        strict: 'off', // TS already use strict
        'no-inline-comments': 'off', // useless
        'no-plusplus': 'off', // Safe in TypeScript
        'max-classes-per-file': 'off', //TypeScript supports multiple classes in one file
        'no-undefined': 'off', // undefined is usefull in TypeScript
        'no-undef': 'off', // TS already check undef variables
        'no-underscore-dangle': 'off', // Disabled: TypeScript has `private`, ORMs use `_id`, and some APIs use `__typename`.
        'capitalized-comments': 'off', // useless when I have commented code
        'no-warning-comments': 'off', // off, because sonarjs have
        'sort-imports': 'off', // Disabled due to a conflict with a rule from eslint-plugin-import

        // Off because typescript
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        'default-param-last': 'off',
        'dot-notation': 'off',
        'init-declarations': 'off',
        'max-params': 'off',
        'no-array-constructor': 'off',
        'no-dupe-class-members': 'off',
        'no-empty-function': 'off',
        'no-implied-eval': 'off',
        'no-loop-func': 'off',
        'no-magic-numbers': 'off',
        'no-restricted-imports': 'off',
        'no-shadow': 'off',
        'no-throw-literal': 'off',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'prefer-destructuring': 'off',
        'prefer-promise-reject-errors': 'off',
        'require-await': 'off',
      }),

      /* Perfectionist rules */
      ...(perfectionistFlag && {
        ...perfectionist.configs['recommended-natural'].rules,
        'perfectionist/sort-interfaces': 'off',
        'perfectionist/sort-objects': 'off',
        'perfectionist/sort-classes': 'off',
        'perfectionist/sort-object-types': 'off',
      }),

      /* Unicorn rules */
      ...(unicornFlag && {
        ...unicorn.configs.all.rules,
        // ...unicorn.configs.recommended.rules,
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
              kebabCase: true,
              pascalCase: true,
            },
            ignore: ['README.md'],
          },
        ],
        'unicorn/no-array-for-each': 'error',
        'unicorn/prevent-abbreviations': [
          'error',
          { allowList: { req: true, res: true, db: true, rel: true, char: true, env: true } },
        ],
        'unicorn/no-empty-file': 'off', // TODO TEMP
        'unicorn/error-message': 'error',
        // Disabled: `null` is standard in databases, APIs, and explicit absence of value is clearer than `undefined`.
        'unicorn/no-null': 'off',
        'unicorn/no-array-callback-reference': 'off',
      }),

      ...(stylisticFlag && {
        ...stylistic.configs.recommended.rules,
        '@stylistic/curly-newline': 'error',
        '@stylistic/max-statements-per-line': ['warn', { max: 1 }],
        '@stylistic/member-delimiter-style': 'error',
        '@stylistic/array-bracket-newline': ['error', 'consistent'],
        '@stylistic/array-bracket-spacing': ['error', 'never'],
        '@stylistic/array-element-newline': ['error', 'consistent'],
        '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        '@stylistic/comma-spacing': [
          'error',
          {
            after: true,
            before: false,
          },
        ],
        '@stylistic/indent': ['error', 2],
        '@stylistic/keyword-spacing': [
          'error',
          {
            after: true,
            before: true,
          },
        ],
        '@stylistic/multiline-comment-stylistic': 'off',
        '@stylistic/no-multiple-empty-lines': [
          'error',
          {
            max: 1,
            maxEOF: 1,
          },
        ],

        '@stylistic/no-trailing-spaces': [
          'error',
          {
            ignoreComments: true,
            skipBlankLines: false,
          },
        ],
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/padded-blocks': ['error', 'never', { allowSingleLineBlocks: true }],
        '@stylistic/quote-props': ['error', 'consistent-as-needed'],
        '@stylistic/quotes': [
          'error',
          'single',
          { allowTemplateLiterals: 'always', avoidEscape: true },
        ],
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/function-call-spacing': ['error', 'never'],
        '@stylistic/function-call-argument-newline': ['error', 'consistent'],
        '@stylistic/jsx-self-closing-comp': 'error',
        '@stylistic/no-multi-spaces': 'error',
        '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
        '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
        '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],
        '@stylistic/function-paren-newline': ['error', 'consistent'],
        '@stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
        '@stylistic/padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'return' },
        ],
        '@stylistic/semi-style': ['error', 'last'],
        // '@stylistic/linebreak-style': ['error', 'unix'], // Can be problematic
        '@stylistic/linebreak-style': 'off',
        '@stylistic/max-len': ['error', { code: 130, ignoreUrls: true }],
        // '@stylistic/max-len': 'off',

        // Disabled because Prettier/impractical
        '@stylistic/func-call-spacing': 'off', // same as `@stylistic/function-call-spacing`
        '@stylistic/no-extra-semi': 'off',
        '@stylistic/multiline-ternary': 'off',
        '@stylistic/one-var-declaration-per-line': 'off',
        '@stylistic/no-tabs': 'off',
        '@stylistic/jsx-child-element-spacing': 'off',
        '@stylistic/implicit-arrow-linebreak': 'off',
        '@stylistic/generator-star-spacing': 'off',
        '@stylistic/jsx-newline': 'off',
        '@stylistic/jsx-sort-props': 'off',
        '@stylistic/jsx-pascal-case': 'off',
        '@stylistic/line-comment-position': 'off',
        '@stylistic/multiline-comment-style': 'off',
        '@stylistic/lines-around-comment': 'off',
        '@stylistic/no-confusing-arrow': 'off',
        '@stylistic/wrap-regex': 'off',
        '@stylistic/nonblock-statement-body-position': 'off',
      }),

      ...(typescriptFlag && {
        /* TypeScript rules */
        // ...ts.configs.recommended.rules,
        ...ts.configs.strict.rules,

        /* Not configurable */
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/ban-tslint-comment': 'error',
        'default-param-last': 'off',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/no-extra-non-null-assertion': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-invalid-this': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-mixed-enums': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/no-unnecessary-qualifier': 'error',
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-deprecated': 'error',
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': 'error',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-array-delete': 'error',
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-unsafe-unary-minus': 'error',
        '@typescript-eslint/no-useless-empty-export': 'error',
        '@typescript-eslint/no-unnecessary-template-expression': 'error',
        '@typescript-eslint/no-unnecessary-type-parameters': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'error',
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
        '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-find': 'error',
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/no-unsafe-type-assertion': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        'no-implied-eval': 'off',
        '@typescript-eslint/no-implied-eval': 'error',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/related-getter-setter-pairs': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',

        /* Configurable */
        '@typescript-eslint/no-inferrable-types': [
          'error',
          {
            ignoreParameters: true,
            ignoreProperties: true,
          },
        ], // Disable when you want explicit types
        '@typescript-eslint/no-extraneous-class': ['error', { allowStaticOnly: true }],
        '@typescript-eslint/no-misused-spread': 'error',
        '@typescript-eslint/explicit-module-boundary-types': [
          'error',
          {
            allowHigherOrderFunctions: true,
            allowTypedFunctionExpressions: true,
            allowedNames: ['setup'],
          },
        ],
        '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/promise-function-async': ['error', { allowAny: false }],
        '@typescript-eslint/prefer-string-starts-ends-with': [
          'error',
          { allowSingleElementEquality: 'always' },
        ],
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow-as-parameter',
          },
        ],
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': ['error', { allowKeywords: true, allowPattern: '' }],
        '@typescript-eslint/method-signature-style': ['error', 'method'],
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
        '@typescript-eslint/array-type': ['error', { default: 'array-simple', readonly: 'array' }],
        '@typescript-eslint/ban-ts-comment': [
          'error',
          { 'ts-expect-error': 'allow-with-description' },
        ],
        'prefer-promise-reject-errors': 'off',
        '@typescript-eslint/prefer-promise-reject-errors': 'error',
        '@typescript-eslint/no-base-to-string': 'error',
        '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            caughtErrors: 'all',
            ignoreRestSiblings: false,
            reportUsedIgnorePattern: false,
          },
        ],
        '@typescript-eslint/no-require-imports': ['error', { allowAsImport: false }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            enforceForJSX: false,
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-confusing-void-expression': 'error',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'error',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': [
          'error',
          {
            ignoreEnums: true,
            ignoreTypeIndexes: true,
            ignoreArrayIndexes: true,
          },
        ],
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',

        '@typescript-eslint/prefer-readonly-parameter-types': 'off', // incompatible with OOP domain classes
        '@typescript-eslint/unbound-method': 'error',
        'class-methods-use-this': 'off',
        '@typescript-eslint/class-methods-use-this': 'error',
        '@typescript-eslint/consistent-type-exports': [
          'error',
          { fixMixedExportsWithInlineTypeSpecifier: true },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: true,
            fixStyle: 'inline-type-imports',
            prefer: 'type-imports',
          },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { accessibility: 'explicit' },
        ],
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowIIFEs: true,
          },
        ],
        '@typescript-eslint/unified-signatures': [
          'error',
          { ignoreDifferentlyNamedParameters: false },
        ],
        '@typescript-eslint/triple-slash-reference': [
          'error',
          { lib: 'never', path: 'never', types: 'never' },
        ],
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowNullableBoolean: false,
            allowNullableObject: false,
          },
        ],
        'no-return-await': 'off',
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],
        '@typescript-eslint/restrict-plus-operands': [
          'error',
          {
            allowAny: false,
            allowBoolean: false,
            allowNullish: false,
            allowNumberAndString: false,
            allowRegExp: false,
          },
        ],
        'max-params': 'off',
        '@typescript-eslint/max-params': 'off',
        '@typescript-eslint/parameter-properties': [
          'error',
          { allow: ['public readonly'], prefer: 'parameter-property' },
        ],
        'prefer-destructuring': 'off',
        '@typescript-eslint/prefer-destructuring': [
          'error',
          {
            object: true,
            array: false,
          },
          {
            enforceForRenamedProperties: false,
            enforceForDeclarationWithTypeAnnotation: false,
          },
        ],
        '@typescript-eslint/restrict-template-expressions': [
          'error',
          {
            allowNumber: true,
            allowBoolean: true,
            allowNullish: true,
            allowAny: false,
            allowArray: false,
            allowRegExp: false,
          },
        ],
        '@typescript-eslint/prefer-readonly': ['error', { onlyInlineLambdas: true }],

        // Disabled for some reason
        'no-throw-literal': 'off',
        '@typescript-eslint/only-throw-error': 'off', // Because detect sveltekit errors as bad
        '@typescript-eslint/typedef': 'off', // If you use strict: true, you don't need this rule!
        'init-declarations': 'off',
        '@typescript-eslint/init-declarations': 'off',
        '@typescript-eslint/member-ordering': 'off', // perfectionist
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-restricted-types': 'off',
        'no-restricted-imports': 'off',
        '@typescript-eslint/no-restricted-imports': 'off',
        // "The code problem checked by this ESLint rule is automatically checked by the TypeScript compiler.
        // Thus, it is not recommended to turn on this rule in new TypeScript projects."
        // https://typescript-eslint.io/rules/no-redeclare/
        '@typescript-eslint/no-redeclare': 'off',
        '@typescript-eslint/require-array-sort-compare': 'off',
        // "If possible, it is recommended to use tsconfig's noImplicitReturns option rather than this rule."
        // https://typescript-eslint.io/rules/consistent-return/
        'consistent-return': 'off',
        '@typescript-eslint/consistent-return': 'off',
        // "The code problem checked by this ESLint rule is automatically checked by the TypeScript compiler.
        // Thus, it is not recommended to turn on this rule in new TypeScript projects.
        // You only need to enable this rule if you prefer the ESLint error messages over the TypeScript compiler error messages."
        // https://typescript-eslint.io/rules/no-dupe-class-members/
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'off',
      }),

      /* Prettier rules — must be last to override all stylistic rules */
      ...(prettierFlag && {
        ...prettier.rules,
      }),
    },
  },
  {
    // svelte-eslint-parser v1.x no longer delegates non-svelte files to the inner parser
    name: 'TypeScript parser override',
    files: ['**/*.{ts,tsx,js,jsx,cjs,mjs}'],
    ignores: [
      'node_modules/**',
      'build/**',
      '.svelte-kit/**',
      'svelte.config.js',
      'eslint.config.js',
      'commitlint.config.js',
      'drizzle.config.ts',
      'docs/**',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: 'Dev scripts',
    files: ['dev/**/*.ts'],
    rules: {
      // Scripts run once in CLI context — sync I/O is fine, no event loop to block
      'node/no-sync': 'off',
      // Path is developer-controlled, not user input — no injection risk
      'security/detect-non-literal-fs-filename': 'off',
      // Dev scripts import from src directly — $lib alias not resolvable outside bundler
      'alias/import-alias': 'off',
      // Seed intentionally deletes all rows — that's the point
      'drizzle/enforce-delete-with-where': 'off',
      // onnotice callback must be empty to suppress PG notices
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    name: 'Tests',
    plugins: {
      js: js,
      '@typescript-eslint': ts,
      vitest: vitest,
      // Enter other plugins whose rules you want to match separately for the tests.
    },
    files: ['tests/**'],
    rules: {
      // Enter the rules you want to match separately for the tests.
      ...(typescriptFlag && {
        '@typescript-eslint/no-magic-numbers': 'off', // vitest/prefer-expect-assertions
      }),
      ...(vitestFlag && {
        ...vitest.configs.recommended.rules,
        'vitest/prefer-strict-boolean-matchers': 'error',
        'vitest/no-conditional-in-test': 'error',
        'vitest/no-done-callback': 'off', //deprecated
        'vitest/consistent-test-filename': ['error', { pattern: '.*\\.(spec|test)\\.[jt]s$' }],
        'vitest/consistent-test-it': 'error',
        'vitest/expect-expect': [
          'error',
          {
            assertFunctionNames: [
              'expect',
              'request.*.expect',
              'request.**.expect',
              'request.*.expect*',
              'get(*).expect',
              'post(*).expect',
              'put(*).expect',
              'delete(*).expect',
              'sendGetRequest(*).expect',
              'sendGetRequest(*).*.expect',
              'sendPostRequest(*).expect',
              'sendPostRequest(*).*.expect',
              'sendPutRequest(*).expect',
              'sendPutRequest(*).*.expect',
              'sendDeleteRequest(*).expect',
              'sendDeleteRequest(*).*.expect',
            ],
          },
        ],
        'vitest/max-expects': ['error', { max: 5 }],
        'vitest/max-nested-describe': ['error', { max: 3 }],
        'vitest/no-alias-methods': 'error',
        'vitest/no-commented-out-tests': 'off',
        'vitest/no-conditional-expect': 'error',
        'vitest/no-conditional-tests': 'error',
        'vitest/no-disabled-tests': 'error',
        'vitest/no-duplicate-hooks': 'error',
        'vitest/no-focused-tests': [
          'error',
          {
            fixable: false,
          },
        ],
        'vitest/no-hooks': 'off',
        'vitest/no-identical-title': 'error',
        'vitest/no-import-node-test': 'error',
        'vitest/no-interpolation-in-snapshots': 'error',
        'vitest/no-large-snapshots': ['error', { maxSize: 50 }],
        'vitest/no-mocks-import': 'error',
        'vitest/no-restricted-matchers': 'error',
        'vitest/no-restricted-vi-methods': 'error',
        'vitest/no-standalone-expect': 'error',
        'vitest/no-test-prefixes': 'error',
        'vitest/no-test-return-statement': 'error',
        'vitest/prefer-called-with': 'error',
        'vitest/prefer-comparison-matcher': 'error',
        'vitest/prefer-each': 'error',
        'vitest/prefer-equality-matcher': 'error',
        'vitest/prefer-expect-assertions': 'error',
        'vitest/prefer-expect-resolves': 'error',
        'vitest/prefer-hooks-in-order': 'error',
        'vitest/prefer-hooks-on-top': 'error',
        'vitest/prefer-lowercase-title': ['error', { ignore: ['describe'] }],
        'vitest/prefer-mock-promise-shorthand': 'error',
        'vitest/prefer-snapshot-hint': 'error',
        'vitest/prefer-spy-on': 'error',
        'vitest/prefer-strict-equal': 'error',
        'vitest/prefer-to-be': 'error',
        'vitest/prefer-to-be-falsy': 'error',
        'vitest/prefer-to-be-object': 'error',
        'vitest/prefer-to-be-truthy': 'error',
        'vitest/prefer-to-contain': 'error',
        'vitest/prefer-to-have-length': 'error',
        'vitest/prefer-todo': 'error',
        'vitest/prefer-vi-mocked': 'error',
        'vitest/require-hook': 'error',
        'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
        'vitest/require-to-throw-message': 'error',
        'vitest/require-top-level-describe': 'error',
        'vitest/valid-describe-callback': 'error',
        'vitest/valid-expect': ['error', { maxArgs: 1 }],
        'vitest/valid-title': [
          'error',
          {
            ignoreTypeOfDescribeName: true,
          },
        ],
        'vitest/valid-expect-in-promise': 'error',
      }),
    },
  },
  {
    name: 'Linting eslint',
    files: ['eslint.config.js'],
    plugins: {
      esEs,
    },
    rules: {
      ...(esEsFlag && {
        'esEs/consistent-output': 'error',
        'esEs/fixer-return': 'error',
        'esEs/meta-property-ordering': 'error',
        'esEs/no-deprecated-context-methods': 'error',
        'esEs/no-deprecated-report-api': 'error',
        'esEs/no-meta-schema-default': 'error',
        'esEs/no-missing-message-ids': 'error',
        'esEs/no-missing-placeholders': 'error',
        'esEs/no-property-in-node': 'error',
        'esEs/no-unused-message-ids': 'error',
        'esEs/no-unused-placeholders': 'error',
        'esEs/no-useless-token-range': 'error',
        'esEs/prefer-message-ids': 'error',
        'esEs/prefer-object-rule': 'error',
        'esEs/prefer-placeholders': 'error',
        'esEs/prefer-replace-text': 'error',
        'esEs/report-message-format': 'error',
        'esEs/require-meta-default-options': 'error',
        'esEs/require-meta-docs-description': 'error',
        'esEs/require-meta-docs-recommended': 'error',
        'esEs/require-meta-docs-url': 'error',
        'esEs/require-meta-fixable': 'error',
        'esEs/require-meta-has-suggestions': 'error',
        'esEs/require-meta-schema': 'error',
        'esEs/require-meta-schema-description': 'error',
        'esEs/require-meta-type': 'error',
        'esEs/no-identical-tests': 'error',
        'esEs/no-only-tests': 'error',
        'esEs/prefer-output-null': 'error',
        'esEs/test-case-property-ordering': 'error',
        'esEs/test-case-shorthand-strings': 'error',
      }),
    },
  },
  {
    name: 'HTML',
    files: ['**/*.html'],
    ignores: ['.svelte-kit/**', '**/fixtures', 'node_modules', 'build', 'docs/**'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      // @html-eslint/eslint-plugin v0.58+ changed plugin key from '@html-eslint' to 'html'
      html: html,
    },
    rules: {
      ...(htmlFlag && {
        ...html.configs.recommended.rules,
        'html/indent': ['error', 2],
        'html/no-extra-spacing-attrs': 'off',
        'html/require-closing-tags': ['error', { selfClosing: 'always' }],
        'html/require-meta-charset': 'error',
        'html/lowercase': 'error',
        'html/require-input-label': 'error',
        'html/require-explicit-size': 'error',
        'html/no-trailing-spaces': 'error',
        'html/no-extra-spacing-text': 'error',
        'html/require-meta-description': 'error',
        'html/require-frame-title': 'error',
        'html/no-non-scalable-viewport': 'error',
        'html/no-target-blank': 'error',
        'html/require-button-type': 'error',
        'html/no-heading-inside-button': 'error',
        'html/require-form-method': 'error',
        'html/sort-attrs': 'error',
      }),
    },
  },
  {
    name: 'JSON',
    files: ['**/*.json'],
    ignores: ['package-lock.json', 'docs/**'],
    language: 'json/json',
    plugins: {
      json: json,
    },
    rules: {
      ...(jsonFlag && {
        ...json.configs.recommended.rules,
      }),
    },
  },
  {
    name: 'Markdown',
    files: ['**/*.md'],
    language: 'markdown/commonmark',
    plugins: {
      markdown,
    },
    rules: {
      ...(markdownFlag && {
        'markdown/fenced-code-language': 'error',
        'markdown/heading-increment': 'error',
        'markdown/no-duplicate-headings': 'error',
        'markdown/no-empty-links': 'error',
        'markdown/no-html': 'error',
        'markdown/no-invalid-label-refs': 'error',
        'markdown/no-missing-label-refs': 'off',
      }),
    },
  },
];
