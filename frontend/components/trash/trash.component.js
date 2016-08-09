import './reset-css.styl';
import './trashStyles.styl';


class TrashComponentController {
	constructor(http, popupNotifications) {
		this.http = http;
		this.popupNotifications = popupNotifications;
		console.log('TRASH COMPONENT LOADED');
	}

	showError(text) {
		this.popupNotifications.notifyError(text);
	}
}

TrashComponentController.$inject = [
	'httpGeneral',
	'popupNotifications'
];

const trashComponent = {
	controller: TrashComponentController,
	selector: 'trashComponent',
	template: require('./trash-pug.component.pug')(),
};

export {
	trashComponent
};