module.exports = {
  overrides: [
    {
      files: ['src/shared/api/**/*.ts', 'src/shared/hooks/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn', // Понижаем до warning для API файлов
      },
    },
    {
      files: ['src/**/*.tsx', 'src/**/*.ts'],
      rules: {
        'react-hooks/exhaustive-deps': 'warn', // Понижаем до warning
      },
    },
  ],
};