class UserService {
	constructor(httpGeneral) {
		this.httpGeneral = httpGeneral;
	}

	getUserAvatars(usersArray) {
		let result = [];
		if (usersArray && usersArray.length) {
			let url = window.location.protocol + '//' + window.location.host + '/profile/user/filter';
			if (window.location.host.indexOf('localhost') !== -1) url = window.location.protocol + '//' + window.location.host + '/users.json';
			this.httpGeneral.sendRequest({
				type: 'GET',
				url: url,

			}).then(function(data) {
				for (let i = 0; i < usersArray.length; i++) {
					for (let j = 0; j < data.length; j++) {
						if (usersArray[i].email && usersArray[i].email.toLowerCase() === data[j].email) {
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
		debugger;
		let url = window.location.protocol + '//' + window.location.host + '/profile/user/filter';
		if (window.location.host.indexOf('localhost') !== -1) url = window.location.protocol + '//' + window.location.host + '/users.json';
		return this.httpGeneral.sendRequest({
			type: 'GET',
			url: url,

		}).then(function(data) {
			return data;
		});
	}
	getUserByEmail(email, array) {
		for (let i = 0; i < array.length; i++) {
			if (array[i] && array[i].email === email) return array[i];
		}
	}
	setUsersShortNames(array) {
		for (let i = 0; i < array.length; i++) {
			array[i].shortName = '';
			if (array[i].firstName) array[i].shortName += array[i].firstName[0].toUpperCase();
			if (array[i].lastName) array[i].shortName += array[i].lastName[0].toUpperCase();
		}
	}
	setUserShortNames(user) {
		user.shortName = '';
		if (user.firstName) user.shortName += user.firstName[0].toUpperCase();
		if (user.lastName) user.shortName += user.lastName[0].toUpperCase();
		return user.shortName;
	}
	setAvatars(ctrlArray, externalArray) {
		let result = [];
		for (let i = 0; i < ctrlArray.length; i++) {
			let found = false;
			for (let j = 0; j < externalArray.length; j++) {
				if (ctrlArray[i].email === externalArray[j].email) {
					if (!externalArray[j].avatar || externalArray[j].avatar.toLowerCase().indexOf('unknown') !== -1) break;
					if (externalArray[j].avatar) {
						ctrlArray[i].avatar = externalArray[j].avatar;
						found = true;
					}
					break;
				}
			}
			if (!found) {
				ctrlArray[i].shortName = '';
				if (ctrlArray[i].firstName) ctrlArray[i].shortName += ctrlArray[i].firstName[0].toUpperCase();
				if (ctrlArray[i].lastName) ctrlArray[i].shortName += ctrlArray[i].lastName[0].toUpperCase();
			}
		}
	}
}

UserService.$inject = ['httpGeneral'];

export {
	UserService
};