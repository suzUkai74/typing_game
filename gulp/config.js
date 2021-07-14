const webpack = require('webpack');
const glob    = require('glob');
const entries = {};

glob.sync("./src/js/**/*.js").map(function (file) {
  const key = file.match(/\.\/src\/js\/(.+)\.js$/)[1]
  entries[key] = [file];
});

module.exports = {
  src: './src',
  dest: './dist',
  build: './build',
  pug_src: [
    './src/pug/**/*.pug',
    '!./src/pug/include/*.pug',
    '!./src/pug/_*.pug'
  ],
  sass_src: [
    './src/sass/**/*.scss',
    '!./src/sass/base/*.scss',
  ],
  sass_dest: './dist/css',
  js_src: [
    './src/js/**/*.js'
  ],
  js_dest: './dist/js',
  webpack: {
    entry: entries,
    output: {
      filename: '[name].js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules']
    }
  }
};
