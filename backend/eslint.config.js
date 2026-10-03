import js from '@eslint/js';
import globals from 'globals';

export default [
	{ ignores: ['node_modules/**', 'swagger/swagger_output.json', 'coverage/**'] },
	js.configs.recommended, // includes no-undef (reports identifiers that are used without being imported or declared)
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.node }
		},
		rules: {
			'no-undef': 'error',
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
		}
	},
	{
		files: ['tests/**/*.js'],
		languageOptions: { globals: { ...globals.node } }
	}
];
