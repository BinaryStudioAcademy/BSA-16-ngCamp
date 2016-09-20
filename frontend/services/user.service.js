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
	getUserByEmail(email, array) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].email === email) return array[i];
		}
	}
	setAvatars(ctrlArray, exteranlArray) {
		let result = [];
		for (let i = 0; i < ctrlArray.length; i++) {
			let found = false
			for (let j = 0; j < exteranlArray.length; j++) {
				if (ctrlArray[i].email === exteranlArray.email) {
					ctrlArray[i].avatar = exteranlArray.avatar;
					found = true;
					break;
				}
			}
			if (!found) {
				ctrlArray[i].shortName = '';
				if(ctrlArray[i].firstName) ctrlArray[i].shortName += ctrlArray[i].firstName[0].toUpperCase();
				if(ctrlArray[i].lastName) ctrlArray[i].shortName += ctrlArray[i].lastName[0].toUpperCase();
			}
		}
	}
}

UserService.$inject = ['httpGeneral'];

export {
	UserService
};