class EventListComponentController {
	constructor(http) {
		this.http = http;

  		this.dtfrom = new Date();
  		this.dtto = new Date();

  		this.popup1 = {
    		opened: false

  		};
        this.popup2 = {
    		opened: false
  		};
     }

  	today () {
    	this.dt = new Date();
  	};
  	open1() {
    	this.popup1.opened = true;
  	}

    open2 () {
    	this.popup2.opened = true;
    	console.log('opned');
    }

 }

EventListComponentController.$inject = [];

const eventListComponent = {
	controller: EventListComponentController,
	controllerAs: 'vm',
	selector: 'eventList',
	template: require('./eventList.component.pug')(),
};

export {
	eventListComponent
};
