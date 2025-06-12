import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'warn', // Требует явно указывать тип возвращаемого значения
      '@typescript-eslint/no-explicit-any': 'warn', // Предупреждает использование `any`
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Использовать только interface (или 'type')
      '@typescript-eslint/no-floating-promises': 'error', // Ошибка, если промис не обработан
      '@typescript-eslint/prefer-optional-chain': 'error', // Рекомендует использовать optional chaining (?.)
      '@typescript-eslint/prefer-nullish-coalescing': 'warn', // Рекомендует использовать ?? вместо ||
    }
  }
];
