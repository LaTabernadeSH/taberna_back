module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.js"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaVersion: 2021,
	},
	rules: {
		indent: ["error", "tab"],
		"no-tabs": "off",
		"no-trailing-spaces": "error",
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
