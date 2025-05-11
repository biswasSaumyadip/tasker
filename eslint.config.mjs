import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
	{
		ignores: ['dist/**', 'coverage/**'],
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json'],
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'@angular-eslint': angularPlugin,
			prettier: prettierPlugin,
		},
		rules: {
			...tsPlugin.configs['recommended'].rules,
			...angularPlugin.configs['recommended'].rules,
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'crlf',
					singleQuote: true,
					trailingComma: 'all',
					tabWidth: 2,
					useTabs: true,
					semi: true,
					printWidth: 100,
					bracketSpacing: true,
					arrowParens: 'always',
				},
			],
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'tasker',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'off',
				{
					type: 'element',
					prefix: 'tasker',
					style: 'kebab-case',
				},
			],			'@typescript-eslint/no-explicit-any': 'warn',
			'no-console': ['warn', { allow: ['warn', 'error'] }],
		},
	},
	{
		files: ['**/*.html'],
		plugins: {
			'@angular-eslint/template': angularTemplatePlugin,
		},
		languageOptions: {
			parser: angularTemplateParser,
		},
		rules: {
			...angularTemplatePlugin.configs['recommended'].rules,
		},
	},
	prettierConfig,
];
