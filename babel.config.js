'use strict';

module.exports = function (api) {
  api.cache.using(
    () =>
      `${process.env.BABEL_ENV}${process.env.NODE_ENV}${process.env.BUILD_TARGET}`
  );

  const config = {
    comments: true,
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-react',
        {
          development:
            process.env.BABEL_ENV === 'development' ||
            process.env.NODE_ENV === 'development',
          runtime: 'automatic',
        },
      ],
      [
        '@babel/preset-env',
        {
          modules: process.env.BUILD_TARGET === 'modules' ? false : undefined,
          targets: process.env.BUILD_TARGET
            ? 'last 2 versions, > 5%, not dead'
            : {node: true},
        },
      ],
    ],
    retainLines: process.env.NODE_ENV !== 'production',
    sourceMaps: true,
  };

  return config;
};
