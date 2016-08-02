var path = require('path');

module.exports = {
	context: path.resolve('frontend'),
	entry: ['./index'],

	devtool: 'cheap-module-eval-source-map',

	output: {
		path: path.resolve('public/js'),
		publicPath: '/public/js/',
		filename: 'bundle.js'
	},

	devServer: {
		contentBase: 'public'
	},

	module: {
		loaders: [{
			test: /\.es6$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.pug$/,
			exclude: /node_modules/,
			loader: 'pug-loader'
		}, {
			test: /\.styl$/,
			exclude: /node_modules/,
			loader: 'style-loader!css-loader!stylus-loader'
		}]
	},

	resolve: {
		extensions: ['', '.js', '.es6', '.styl', '.pug']
	}
};