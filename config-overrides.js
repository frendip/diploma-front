module.exports = function override(config, env) {
    config.externals = {
        ...config.externals,
        '@yandex/ymaps3': [
            `promise new Promise((resolve) => {
              return ymaps3.ready.then(() => resolve(ymaps3));
               })`
        ],
        '@yandex/ymaps3/reactify': [
            `promise new Promise((resolve) => {
              return ymaps3.ready.then(() => ymaps3.import('@yandex/ymaps3-reactify').then(resolve));
               })`
        ],
        '@yandex/ymaps3/packages/markers': [
            `promise new Promise((resolve) => {
              return ymaps3.ready.then(() => ymaps3.import('@yandex/ymaps3-markers@0.0.1').then(resolve));
               })`
        ]
    };

    return config;
};
