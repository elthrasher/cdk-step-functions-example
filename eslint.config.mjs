import { defineConfig, globalIgnores } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/*.d.ts", "**/build", "**/cdk.out", "coverage/**"]), {
    files: ['**/*.js'],

    rules: {
        'no-duplicate-imports': 'error',
    },
},
{
    extends: compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),
    files: ["**/*.ts"],

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2019,
        sourceType: "module",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/no-floating-promises": ["error"],

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],
    },
}]);
