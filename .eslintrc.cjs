/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	extends: [
		"plugin:vue/vue3-essential",
		"plugin:vue/vue3-strongly-recommended",
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier/skip-formatting",
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		project: ["./tsconfig.app.json"],
		tsconfigRootDir: __dirname,
		parser: "@typescript-eslint/parser",
	},
	rules: {
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_+$",
			},
		],
	},
	ignorePatterns: ["/*", "!/src"],
};
