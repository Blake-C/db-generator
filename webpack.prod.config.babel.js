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
import validaate from 'webpack-validator';
import entryFiles from './webpack._entryFiles.config';
import modernizrRules from './webpack._modernizrRules.config';

const webpackConfig = validaate({
	context: path.resolve(__dirname, './app/'),
	entry: entryFiles,
	output: {
		filename: './dist/assets/scripts/bundle.[name].js'
	},
	eslint: {
		failOnWarning: false,
		failOnError: true
	},

	/**
	 * Modules
	 *
	 */
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

	/**
	 * Plugins
	 *
	 */
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		// new webpack.optimize.LoaderOptionsPlugin({
		// 	minimize: true,
		// 	debug: false
		// }),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		}),
		new ModernizrWebpackPlugin({
			filename: './dist/assets/scripts/bundle.modernizr.js',
			minify: {
				output: {
					comments: false,
					beautify: false
				}
			},
			'feature-detects': modernizrRules,
			'options': [
				'setClasses'
			]
		})
	]
})

export default webpackConfig;
