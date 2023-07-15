module.exports = {
    'env': {
        'browser': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'rules': {
        'semi': [2, 'always'],
        "@typescript-eslint/consistent-type-imports": ["error", {
            "prefer": "type-imports"
        }],
        // '@typescript-eslint/semi': 'off',
        'indent': [2, 4, {'SwitchCase': 1}],
        // '@typescript-eslint/indent': [2,4, {'SwitchCase': 1}],
        // '@typescript-eslint/explicit-function-return-type': 'off',
        // '@typescript-eslint/strict-boolean-expressions': [2, {
        //   allowNullableString: true, 
        //   allowNullableNumber: true, 
        //   allowNullableBoolean: true, 
        //   allowAny: true
        // }],
        // '@typescript-eslint/no-misused-promises': [
        //   'error',
        //   {
        //     'checksVoidReturn': {
        //       'arguments': false,
        //       'attributes': false
        //     }
        //   }
        // ],
        // 'n/no-callback-literal': 'off'
    }
};

