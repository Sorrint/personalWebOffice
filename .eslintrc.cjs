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
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports'
        }],
        'indent': [2, 4, {'SwitchCase': 1}],
        '@typescript-eslint/ban-ts-comment': 0,   
        "react/display-name": 0,
        "react/prop-types": 0
    }
};

