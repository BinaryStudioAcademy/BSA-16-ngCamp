import './eventsStyles.styl';

class EventsComponentController {
	constructor(http) {
		this.http = http;
	}
}

EventsComponentController.$inject = [
	'httpGeneral'
];

const eventsComponent = {
	controller: EventsComponentController,
	selector: 'eventsComponent',
	template: require('./events-pug.component.pug')(),
	$routeConfig: [{
		path:'/',
		name:'Events_list',
		component:'eventsComponent'
	},{
		path:'/post',
		name:'Create event',
		component:'eventEditComponent'
	},{
		path:'/:id/post',
		name:'Edit event',
		component:'eventEditComponent'
	}]
};

export {
	eventsComponent
};