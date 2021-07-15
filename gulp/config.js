const webpack = require('webpack');
const glob    = require('glob');
const entries = {};

glob.sync("./src/js/**/*.js").map(function (file) {
  const key = file.match(/\.\/src\/js\/(.+)\.js$/)[1]
  entries[key] = [file];
});

module.exports = {
  src: './src',
  dest: './dest',
  build: './build',
  pug_src: [
    './src/pug/**/*.pug',
    '!./src/pug/_*.pug'
  ],
  sass_src: [
    './src/sass/**/*.scss',
  ],
  sass_dest: './dest/css',
  js_src: [
    './src/js/**/*.js'
  ],
  js_dest: './dest/js',
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
