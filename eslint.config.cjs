const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.min.js',
      '**/*.spec.ts',
      '**/*.html'
    ],
  },

  {
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
  },

  ...compat.config({
    extends: [
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      'plugin:@angular-eslint/template/recommended',
    ],
  }),

  {
    files: ['projects/host-app/src/app/**/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['projects/host-app/tsconfig.app.json'],
        createDefaultProgram: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  {
    files: ['projects/mfe-app/src/app/**/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['projects/mfe-app/tsconfig.app.json'],
        createDefaultProgram: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
    },
  },

  {
    files: [
      'projects/host-app/src/app/**/*.html',
      'projects/mfe-app/src/app/**/*.html',
    ],
    processor: '@angular-eslint/template/extract-inline-html',
    rules: {
      'eslint-disable': 'all',
    },
  },
];
