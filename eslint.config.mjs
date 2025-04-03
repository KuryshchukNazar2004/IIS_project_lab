import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Вимкнення правила для використання any
      '@typescript-eslint/no-explicit-any': 'off',
      // Вимкнення правила для невикористаних змінних
      '@typescript-eslint/no-unused-vars': 'off',
      // Вимкнення попередження для залежностей useEffect
      'react-hooks/exhaustive-deps': 'off',
      // Вимкнення попередження для невикористаних змінних
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
