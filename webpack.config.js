/* global __dirname, require, module*/

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = yargs.argv.env ? yargs.argv.env : 'none';
const ds = yargs.argv.name ? yargs.argv.name : null;
const { filterSchemaNames } = require('./scripts/lib/utils');
const crypto = require('crypto');

const crypto_orig_createHash = crypto.createHash;
crypto.createHash = (algorithm) => crypto_orig_createHash(algorithm == 'md4' ? 'sha256' : algorithm);

function getFiles(dir, prefix = '') {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    return dirent.isDirectory()
      ? getFiles(path.resolve(dir, dirent.name), prefix + dirent.name + '/')
      : prefix + dirent.name;
  });
  return Array.prototype.concat(...files);
}

// наполняем объект entry записями о jsx/tsx файлах из директорий типа ds_xxx
// для serv:
//  'srv/resources/ds_xxx/File': './src/ds_xxx/File.tsx',
// Для production (build)
//  'ds_xxx/File': './src/ds_xxx/File.tsx',
const entry = {}; //  __dirname + '/src/index.jsx',
const SRC = path.resolve(__dirname, 'src');
const SCHEMA_NAMES = filterSchemaNames(
  fs.readdirSync(SRC).filter((fileName) => fs.statSync(path.resolve(SRC, fileName)).isDirectory())
);
SCHEMA_NAMES.forEach((schema_name) => {
  const files = getFiles(path.resolve(SRC, schema_name)).filter(
    (fileName) => fileName.endsWith('.tsx') || fileName.endsWith('.jsx')
  );
  files.forEach((fileName) => {
    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
    if (!(fileName.indexOf('src/') + 1)) {
      console.log(`Register file: /${schema_name}/${fileNameWithoutExtension}`);
      if (env === 'production' || env === 'development') {
        entry[`${schema_name}/${fileNameWithoutExtension}`] = `./src/${schema_name}/${fileName}`;
      } else {
        entry[`srv/resources/${schema_name}/${fileNameWithoutExtension}`] = `./src/${schema_name}/${fileName}`;
      }
    }
  });
});

module.exports = {
  mode: env,
  entry,
  devtool: 'source-map',
  output: {
    publicPath: '',
    path: path.resolve(__dirname, `dist_${env}`),
    filename: '[name].js',
    library: pkg.name,
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    classnames: 'classnames',
    jquery: 'jquery',
    axios: 'axios',
    'bi-internal': 'bi-internal',
    'bi-internal/core': 'bi-internal/core',
    'bi-internal/services': 'bi-internal/services',
    'bi-internal/utils': 'bi-internal/utils',
    'bi-internal/ds-helpers': 'bi-internal/ds-helpers',
    'bi-internal/ui': 'bi-internal/ui'
  },
  optimization: {
    minimize: env && env === 'production' // disables uglify
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js|\.ts|\.tsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader' // Compiles Sass to CSS
        ]
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader' // Translates CSS into CommonJS
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              encoding: 'utf8'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              limit: 8192,
              outputPath: (url, resourcePath, context) => {
                resourcePath = resourcePath.slice(context.length + path.sep.length);
                resourcePath = resourcePath.split(path.sep);

                console.log('resourcePath => ', resourcePath);

                if (resourcePath[0] !== 'src') throw new Error('Cannot get image outside ot src', resourcePath);
                // todo: не уверен в правильности решения строчкой ниже, нужно смотреть на последствия
                // if (resourcePath.filter(f => f === 'src').length > 1) throw new Error('Cannot get image in src in ds_*', resourcePath);

                resourcePath = resourcePath.slice(1);

                const schema_name = resourcePath[0];
                if (!schema_name.startsWith('ds_')) throw new Error('Cannot get image outside ot schema', resourcePath);
                resourcePath = resourcePath.slice(1);

                if (env === 'production' || env === 'development') {
                  return path.join(schema_name, ...resourcePath);
                } else {
                  return path.join('srv', 'resources', schema_name, ...resourcePath);
                }
              }
            }
          }
        ],
        exclude: (url) => !url.match(/src\/ds_[0-9][0-9]*[0-9]*[0-9]\/src/)
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass', '.svg'],
    alias: {
      process: 'process/browser.js'
    }
  },
  plugins: [
    // new HtmlWebpackPlugin({ template: path.resolve('src/ds_52', 'index.html') }),

    new webpack.ProvidePlugin({
      process: 'process/browser.js'
    }),
    new CopyPlugin({
      // для каждой схемы из зарегистрированных копируем файлы в свою директорию (кроме файлов scss и react)
      patterns: SCHEMA_NAMES.map((schema_name) => ({
        from: path.join('src', schema_name),
        to: env === 'production' || env === 'development' ? schema_name : `srv/resources/${schema_name}`,
        filter: (f) =>
          !(f.endsWith('.tsx') || f.endsWith('.jsx') || f.endsWith('.scss') || f.match(/src\/ds_.{1,20}\/src/)),

        noErrorOnMissing: true
      }))
    })
  ]
};
