import '../../templates/eventEdit.component.styl';

class eventEditController {
    constructor(popupNotifications) {
        this.popupNotifications = popupNotifications;
    }
}

eventEditController.$inject = ['eventEditController'];

const eventEditComponent = {
    controller: eventEditController,
    selector: 'eventEditComponent',
    template: require('../../templates/eventEdit.component.pug')(),
};

export {
	eventEditComponent
};