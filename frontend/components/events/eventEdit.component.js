import './eventEdit.component.styl';

class eventEditController {
    constructor(popupNotifications,$location) {
        this.popupNotifications = popupNotifications;
        this.location = $location;
    }
}

eventEditController.$inject = ['popupNotifications','$location'];

const eventEditComponent = {
    controller: eventEditController,
    selector: 'eventEditComponent',
    template: require('./eventEdit.component.pug')(),
};

export {
	eventEditComponent
};