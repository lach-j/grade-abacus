import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const entry = './src/index.js';
export const plugins = [
  new HtmlWebpackPlugin({
    title: 'Caching',
  }),
];
export const output = {
  filename: '[name].[contenthash].js',
  path: resolve(__dirname, 'dist'),
  clean: true,
};
