class UserService {
	constructor(httpGeneral) {
		this.httpGeneral = httpGeneral;
	}

	getUserAvatars(usersArray) {
		let result = [];
		if (usersArray && usersArray.length) {
			let url = window.location.protocol + '//' + window.location.host + '/profile/user/filter';
			if (window.location.host.indexOf('localhost') !== -1) url = 'http://team.binary-studio.com/profile/user/filter';
			this.httpGeneral.sendRequest({
				type: 'GET',
				url: url,

			}).then(function(data) {
				for (let i = 0; i < usersArray.length; i++) {
					for (let j = 0; j < data.length; j++) {
						if (usersArray[i].email.toLowerCase() === data[j].email) {
							result.push(usersArray[i]);
							result[result.length - 1].avatar = data[j].avatar;
							break;
						}
					}
				}
				return result;
			});
		}
	}
	getExternalUsersData() {
		let url = window.location.protocol + '//' + window.location.host + '/profile/user/filter';
		if (window.location.host.indexOf('localhost') !== -1) url = 'http://team.binary-studio.com/profile/user/filter';
		return this.httpGeneral.sendRequest({
			type: 'GET',
			url: url,

		}).then(function(data) {
			return data;
		});
	}
}

UserService.$inject = ['httpGeneral'];

export {
	UserService
};