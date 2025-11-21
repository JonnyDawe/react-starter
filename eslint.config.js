import antfu from '@antfu/eslint-config';

export default antfu(
  {
    typescript: true,
    react: true,
    ignores: [
      '.github',
      'dist',
      'node_modules',
      'README.md',
    ],
  },
  {
    rules: {
      'style/brace-style': ['error', '1tbs'],
      'style/arrow-parens': ['error', 'always'],
      'curly': ['error', 'all'],
      'antfu/consistent-list-newline': 'off',
      'no-console': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'style/semi': ['error', 'always'],
    },
  },
  {
    files: ['package.json'],
    rules: {
      'style/eol-last': 'off',
    },
  },
);
