module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-scss'],
  rules: {
    'color-hex-length': 'short',
    'font-family-no-duplicate-names': true,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep']
      }
    ],
    'scss/at-rule-no-unknown': true,
    'scss/load-no-partial-leading-underscore': true,
    'scss/at-import-no-partial-leading-underscore': true,
    'media-feature-range-notation': 'prefix'
  },
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/*.js',
    '**/*.ts',
    '**/*.html',
  ],
};
