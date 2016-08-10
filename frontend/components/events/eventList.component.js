class EventListComponentController {
	constructor(http) {
		this.http = http;
	}
}

EventListComponentController.$inject = [];

const eventListComponent = {
	controller: EventListComponentController,
	selector: 'eventList',
	template: require('./eventList.component.pug')(),
};

export {
	eventListComponent
};