import './eventsStyles.styl';

class EventListComponentController {
	constructor(httpGeneral, $location, $sce,UserService) {
		this.httpGeneral = httpGeneral;
		this.userService = UserService;
		this.location = $location;
		this.dtfrom = new Date();
		this.dtto = new Date();
		this.events = [];
		this.sce = $sce;
		this.userEvents = [];
		this.popup1 = {
			opened: false

		};
		this.popup2 = {
			opened: false
		};
		this.participants = [];
		this.isAdmin = false;
		this.dateOptions = {};
		this.refreshDate = refreshDate;
	}

	trustAsHtml(string) {
		let self = this;
		return self.sce.trustAsHtml(string);
	}

	getDate(event) {
		let strtDate = new Date(event.startDate);
		let endDate = new Date(event.endDate);
		let strtDateString = `${strtDate.getDate()}/${strtDate.getMonth()}/${strtDate.getFullYear()} at ${strtDate.getHours()}:${strtDate.getMinutes()}`;
		let endDateString = `${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear()} at ${endDate.getHours()}:${endDate.getMinutes()}`;
		if (strtDateString === endDateString) {
			return strtDateString;
		};
		let duration = Math.floor((endDate.getTime() - strtDate.getTime()) / (1000 * 60 * 60 * 24));
		let result = `from "${strtDateString}" to "${endDateString}", duration ${duration} days`;
		return result;
	}

	open1() {
		this.popup1.opened = true;
	}
	open2() {
		this.popup2.opened = true;
		//console.log('opned');
	}
	$onInit() {
		let self = this;
		self.userEvents = [];
		self.httpGeneral.sendRequest({
			type: "GET",
			url: "api/event"
		}).then(function(res) {
			self.events = res;
			for (let event in self.events) {
				if (self.events[event].project === window._injectedData.currentProject) {
					self.userEvents.push(self.events[event]);
				};
			};
		});
		let projReq = {
			type: "GET",
			url: `api/projects/${window._injectedData.currentProject}/withUsers`,
			errorCallback() {
				self.popup.notifyError('Project download Error!');
			}
		};
		self.httpGeneral.sendRequest(projReq).then(function(res) {
			for (let i = 0; i < res.admins.length; i++) {
				if (res.admins[i]._id === window._injectedData.userId) {
					self.isAdmin = true;
				}
			}
		});

		self.userService.getExternalUsersData().then((result)=>{
            self.userInfo = result;
            console.log(self.userInfo);
        });
	}

	filter() {
		let self = this;
		self.userEvents = [];
		self.httpGeneral.sendRequest({
			type: "GET",
			url: `api/event/from/${self.dtfrom}/to/${self.dtto}`
		}).then(function(res) {
			self.events = res;
			if (self.events != undefined) {
				for (let event in self.events) {
					if (self.events[event].project === window._injectedData.currentProject) {
						self.userEvents.push(self.events[event]);
					};
				};
			}
		});
	}
	isAuthor(event) {
		let self = this;
		let ans = false;
		if (event.author === window._injectedData.userId) ans = true;
		return ans;
	}
}

function refreshDate() {
	let vm = this;
	vm.dateOptions.minDate = vm.dtfrom;
}

EventListComponentController.$inject = ['httpGeneral', '$location', '$sce','UserService'];

const eventListComponent = {
	controller: EventListComponentController,
	controllerAs: 'vm',
	selector: 'eventList',
	template: require('./eventList.component.pug')(),
};

export {
	eventListComponent
};