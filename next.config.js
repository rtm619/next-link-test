const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const withOffline = require('next-offline');
const withCSS = require('@zeit/next-css');
const withEslint = require('next-eslint');
const withImages = require('next-images');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const withPurgeCss = require('next-purgecss');
const withPlugins = require('next-compose-plugins');

require('dotenv').config();

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
  }
}

const workboxOptions = {
  runtimeCaching: [
    { urlPattern: /^https?.*\/$/, handler: 'networkFirst' },
    { urlPattern: /^https?.*[^/]$/, handler: 'networkFirst' },
    {
      urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
      handler: 'cacheFirst',
      options: {
        cacheName: 'image-cache',
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
};

const nextConfig = {
  webpack: (config, { dev, buildId }) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
      
    );

    return config;
  },
  useFileSystemPublicRoutes: false,
};

// module.exports = withPlugins(
//   [
//     [
//       withPurgeCss,
//       {
//         purgeCssPaths: [
//           'pages/**/*.js',
//           'components/**/*.js',
//           'utils/**/*.js',
//           'out/**/*.html',
//         ],
//         purgeCss: {
//           whitelistPatterns: () => [/^slick-/],
//           extractors: [
//             {
//               extractor: TailwindExtractor,

//               // Specify the file extensions to include when scanning for
//               // class names.
//               extensions: ['js', 'html'],
//             },
//           ],
//         },
//       },
//     ],
//     withCSS,
//     withImages,
//   ],
//   nextConfig
// );

const hasImages = withImages(nextConfig);
const hasPurgeCss = withPurgeCss(
  Object.assign(
    {},
    {
      purgeCssPaths: [
        'pages/**/*.js',
        'components/**/*.js',
        'utils/**/*.js',
        'out/**/*.html',
      ],
      purgeCss: {
        whitelistPatterns: () => [/^slick-/],
        extractors: [
          {
            extractor: TailwindExtractor,

            // Specify the file extensions to include when scanning for
            // class names.
            extensions: ['js', 'html'],
          },
        ],
      },
    },
    hasImages
  )
);
const hasCss = withCSS(hasPurgeCss);

const hasOffline = withOffline(hasCss);

module.exports = hasOffline;
