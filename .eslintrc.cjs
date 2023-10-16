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
        'react',
        'fsd-custom-sorrint'
    ],
    'settings': {
        'react': {
            'version': 'detect'
        }
    },
    'rules': {
        'semi': [0, 'always'],
        '@typescript-eslint/consistent-type-imports': ['error', {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports'
        }],
        'indent': [2, 4, {'SwitchCase': 1}],
        '@typescript-eslint/ban-ts-comment': 0,   
        'react/display-name': 0,
        'react/prop-types': 0,
        '@typescript-eslint/no-explicit-any': [1, { 'ignoreRestArgs': true }],
        'fsd-custom-sorrint/path-checker': [2, { alias: '@' }],
        // 'fsd-custom-sorrint/layer-imports': [2, { alias: '@', ignoreImportPatterns: ['**/storeProvider'] }],
        'fsd-custom-sorrint/public-api-imports': [2, { alias: '@' }],
        'quotes': ['error', 'single']
    }
};

//entites/order @shared/button