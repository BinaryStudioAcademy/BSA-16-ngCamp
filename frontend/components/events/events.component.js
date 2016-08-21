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
		name:'Events List',
		component:'eventList',
		useAsDefault: true
	},{
  		path:'/post',
  		name:'CreateEvent',
  		component:'eventCreateComponent',
	},{
 		path:'/:id/post',
 		name:'Edit event',
 		component:'eventEditComponent',
	}]
};

export {
	eventsComponent
};