//import './userStyles.styl';

class UserComponentController {
	constructor(http, popupNotifications) {
		this.http = http;
		this.popupNotifications = popupNotifications;
		console.log('USER COMPONENT LOADED');
	}

	some() {
		console.log('http:', this.http);
		console.log('sendRequest:', this.http.sendRequest);

		console.log(this.http.sendRequest({
		type: 'get',
        url: '/api/user'
    	}));
	}

	another() {
		this.some();
	}

	showError(text) {
		this.popupNotifications.notifyError(text);
	}
}

UserComponentController.$inject = [
	'httpGeneral',
	'popupNotifications'
];

const userComponent = {
	controller: UserComponentController,
	selector: 'userComponent',
	template: require('./user-pug.component.pug')(),
};

export {
	userComponent
};