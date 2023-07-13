module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "ignorePatterns": ['.eslintrc.cjs', 'vite.config.ts', 'vite-env.d.ts'],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "tsconfig.json"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": [2, "always"],
        "@typescript-eslint/semi": "off",
        "indent": [2, 4, {"SwitchCase": 1}],
        "@typescript-eslint/indent": [2,4, {"SwitchCase": 1}],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/strict-boolean-expressions": [2, {
            allowNullableString: true, 
            allowNullableNumber: true, 
            allowNullableBoolean: true, 
            allowAny: true
        }],
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                "checksVoidReturn": {
                  "arguments": false,
                  "attributes": false
                }
              }
          ],
        "n/no-callback-literal": "off"
    }
}
