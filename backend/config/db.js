module.exports = {
	dbname: 'notbasecamp',
	uri: 'mongodb://localhost/notbasecamp',
	mocked_db: false,
	opts: {
		server: {
			auto_reconnect: true,
			poolSize: 40
		},
		user: 'root'
	}
};