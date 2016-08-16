class EventListComponentController {
	constructor(http) {
		this.http = http;
		// this.inlineOptions = {
  //   		customClass: getDayClass,
  //   		minDate: new Date(),
  //   		showWeeks: true
  // 		};
  		this.dtfrom = new Date();
  		this.dtto = new Date();

  		// this.dateOptions = {
    // 		dateDisabled: disabled,
    // 		formatYear: 'yy',
    // 		maxDate: new Date(2020, 5, 22),
    // 		minDate: new Date(),
    // 		startingDay: 1
  		// };
  // 		this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  //       this.format = this.formats[0];
  // 		this.altInputFormats = ['M!/d!/yyyy'];
  		this.popup1 = {
    		opened: false

  		};
        this.popup2 = {
    		opened: false
  		};
  // 		
  // 		this.tomorrow = new Date();
  // 
  //       this.afterTomorrow = new Date();
  //       this.afterTomorrow.setDate(tomorrow.getDate() + 1);
  // 		this.events = [
  //   		{
  //   		  date: tomorrow,
  //   		  status: 'full'
  //   		},
  //   		{
  //   		  date: afterTomorrow,
  //   		  status: 'partially'
  //   		}
  //   	];

    }


   //  clear(){
   //  	this.dt = null;
   //  }
   //  disabled(data) {
   //  	let date = data.date,
   //  	mode = data.mode;
   //  	return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  	// }
 
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

    getDayClass(data) {
    	let date = data.date,
      	mode = data.mode;
   		if (mode === 'day') {
        	let dayToCheck = new Date(date).setHours(0,0,0,0);

        	for (let i = 0; i < this.events.length; i++) {
        		let currentDay = new Date(this.events[i].date).setHours(0,0,0,0);
        		if (dayToCheck === currentDay) {
        		  return this.events[i].status;
        		}
      		}
    	}
    return '';
  	}
}




  // $scope.clear = function() {
  //   $scope.dt = null;
  // };

  // $scope.inlineOptions = {
  //   customClass: getDayClass,
  //   minDate: new Date(),
  //   showWeeks: true
  // };





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



	// constructor(http) {
	// 	this.http = http;
	// 	this.oneAtATime = true;
	// 	this.groups = [
 //    		{
 //    		  title: 'Dynamic Group Header - 1',
 //    		  content: 'Dynamic Group Body - 1'
 //    		},
 //    		{
 //    		  title: 'Dynamic Group Header - 2',
 //    		  content: 'Dynamic Group Body - 2'
 //    		}
 //  		];
 //  		this.items = ['Item 1', 'Item 2', 'Item 3'];
 //  		this.status = {
 //    		isCustomHeaderOpen: false,
 //    		isFirstOpen: true,
 //    		isFirstDisabled: false
 //  		};
 //    };
	// addItem () {
 //    		let newItemNo = this.items.length + 1;
 //    		this.items.push('Item ' + newItemNo);
 //    };