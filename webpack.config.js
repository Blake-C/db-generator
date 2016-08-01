/**
 * Webpack Config
 *
 * @link http://css-max.com/getting-started-with-webpack/
 * @link https://shellmonger.com/2016/01/26/using-eslint-with-webpack/
 *
 * Eslint config for module loaders:
 * @link https://github.com/eslint/eslint/issues/4787
*/
import path from 'path';
import webpack from 'webpack';

const webpackConfig = {
	module: {
		preLoaders: [
			{
				test: /\.js?$/,
				loader: 'eslint',
				exclude: /(node_modules|bower_components)/,
			}
		],
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	eslint: {
		failOnWarning: false,
		failOnError: true
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],
	resolve: {
		root: path.resolve("./root"),
	},
	output: {
		filename: '[name].js'
	},
	devtool: 'source-map'
}

export default webpackConfig;
