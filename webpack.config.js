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
import ModernizrWebpackPlugin from 'modernizr-webpack-plugin';

const webpackConfig = {
	quiet: false,
	resolve: {
		root: path.resolve(__dirname, 'app')
	},
	entry: {
		main: 'components/scripts/main.js',
		app: 'components/scripts/app.jsx',
	},
	output: {
		filename: '[name].js'
	},
	devtool: 'eval-cheap-module-source-map',
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /(node_modules|bower_components')/
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /(node_modules|bower_components)/
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
		}),
		new ModernizrWebpackPlugin({
			filename: 'modernizr.js',
			minify: {
				output: {
					comments: false,
					beautify: false
				}
			},
			'feature-detects': [
				'svg',
				'css/transforms',
				'css/transforms3d',
				'css/transitions'
			],
			'options': [
				'setClasses'
			]
		})
	]
}

export default webpackConfig;
