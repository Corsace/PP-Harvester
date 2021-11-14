module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    plugins: [
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "space-infix-ops": "error",
        "space-before-function-paren": ["error", {
            "anonymous": "ignore",
            "named": "always",
            "asyncArrow": "always",
        }],
        semi: [
            "error",
            "always",
        ],
        quotes: [
            "error",
            "double",
            { allowTemplateLiterals: true },
        ],
        indent: [
            "error",
            4,
            { SwitchCase: 1 },
        ],
        "comma-dangle": [
            "error", {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "never",
            },
        ],
    },
};
