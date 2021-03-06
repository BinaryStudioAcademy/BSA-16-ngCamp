var path = require('path');

module.exports = {
	context: path.resolve('frontend'),
	entry: ['./index', './app.js'],

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
		preLoaders: [{
			test: /\.js$/,
			loader: "eslint",
			exclude: /node_modules/
		}],

		loaders: [{
			test: /\.js$/,
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
		}, { 
			test: /\.css$/, 
			loader: 'style!css' 
		}, { 
			test: /\.html$/, 
			loader: 'raw'  
		}]
	},

	eslint: {
		failOnWarning: true,
		failOnError: true
	},

	resolve: {
		extensions: ['', '.js', '.styl', '.pug']
	}
};