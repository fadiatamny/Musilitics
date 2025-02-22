import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default [
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ),
    {
        languageOptions: {
            ecmaVersion: 5,
            sourceType: 'script',

            parserOptions: {
                parser: '@typescript-eslint/parser'
            }
        },

        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-assertions': 'warn',
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/no-unused-expressions': 'warn',
            '@typescript-eslint/ban-ts-comment': 'off'
        }
    }
]
