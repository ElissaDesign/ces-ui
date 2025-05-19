import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

// ----------------------------------------------------------------------

const commonRules = () => ({
  ...reactHooksPlugin.configs.recommended.rules,
  'func-names': 1,
  'no-bitwise': 1,
  'no-unused-vars': 0,
  'object-shorthand': 1,
  'no-useless-rename': 1,
  'default-case-last': 1,
  'consistent-return': 1,
  'no-constant-condition': 1,
  'default-case': [1, { commentPattern: '^no default$' }],
  'lines-around-directive': [1, { before: 'always', after: 'always' }],
  'arrow-body-style': [1, 'as-needed', { requireReturnForObjectLiteral: true }],
  // react
  'react/jsx-key': 0,
  'react/prop-types': 0,
  'react/display-name': 0,
  'react/no-children-prop': 0,
  'react/jsx-boolean-value': 1,
  'react/self-closing-comp': 1,
  'react/react-in-jsx-scope': 0,
  'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
  'react/jsx-curly-brace-presence': [1, { props: 'never', children: 'never' }],
  // typescript
  '@typescript-eslint/no-shadow': 1,
  '@typescript-eslint/no-explicit-any': 0,
  '@typescript-eslint/no-empty-object-type': 0,
  '@typescript-eslint/consistent-type-imports': 0,
  '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
});

// Only keep unused imports as a warning
const unusedImportsRules = () => ({
  'unused-imports/no-unused-imports': 1,
  'unused-imports/no-unused-vars': [
    0,
    { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
  ],
});

export const customConfig = {
  plugins: {
    'react-hooks': reactHooksPlugin,
    'unused-imports': unusedImportsPlugin,
    perfectionist: perfectionistPlugin,
    import: importPlugin,
  },
  settings: {
    ...importPlugin.configs.typescript.settings,
    'import/resolver': {
      ...importPlugin.configs.typescript.settings['import/resolver'],
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    ...commonRules(),
    ...unusedImportsRules(),
    // Import and perfectionist rules removed for less strictness
  },
};

// ----------------------------------------------------------------------

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['*', '!src/', '!eslint.config.*'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    settings: { react: { version: 'detect' } },
  },
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  reactPlugin.configs.flat.recommended,
  customConfig,
];
