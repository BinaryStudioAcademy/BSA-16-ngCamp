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
  		path:'/post',
  		name:'Create event',
	},{
 		path:'/:id/post',
 		name:'Edit event',
	}]
};

export {
	eventsComponent
};