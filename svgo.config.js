export default {
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {},
            },
        },
        {
            name: 'convertColors',
            params: {
                currentColor: true, // заменяет fill/stroke на currentColor
            },
        },
        'removeDimensions',
        'removeAttrs',
        'removeComments',
    ],
};
