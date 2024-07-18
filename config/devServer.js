const path = require('path')

module.exports = {
	devServer: {
		port: 9000,
		compress: true,
		hot: true,
		allowedHosts: 'all',
		static: [
			path.join(__dirname, '../static'),
		],
	},
}
