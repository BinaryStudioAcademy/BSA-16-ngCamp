import './menuStyles.styl';

class MenuComponentController {
	constructor(httpGeneral, $location, $rootRouter, $scope, $rootScope) {
		this.http = httpGeneral;
		this.disabled = true;
		this.location = $location;
		this.rootRouter = $rootRouter;
		this.scope = $scope;
		this.rootScp = $rootScope;
		this.userProjects;
		this.checkinsAccess = window._injectedData.isCheckinEdit;
		this.reportAccess = window._injectedData.isReports;
	}


	$onInit() {

		let self = this;
		let curentPath = self.location.path();

		self.getProjectsInfo();

		self.scope.$on('menuReload', function() {
			self.getProjectsInfo();
		});

		self.selectMenuItem(curentPath);

	}


	getProjectsInfo() {
		let self = this;
		if (!window._injectedData.currentProject) {
			self.disabled = false;
		} else {
			self.disabled = true;
		};

		let userReq = {
			type: "GET",
			url: "api/projects/forCurrentUser",
		};

		self.http.sendRequest(userReq).then(function(res) {
			self.userProjects = res;
			self.http.sendRequest({
				type: "GET",
				url: `api/projects/${window._injectedData.currentProject}/isAdmin/${window._injectedData.userId}`
			}).then(function(res) {
				// console.log(res);
				if (!res) {
					window._injectedData.isSettingsEdit = false;
					window._injectedData.isReports = false;
					window._injectedData.isCheckinEdit = false;
				} else {
					window._injectedData.isSettingsEdit = res.isSettingsEdit;
					self.checkinsAccess = res.isCheckinEdit;
					window._injectedData.isReports = res.isReports;
					self.checkinsAccess = res.isReports;
					window._injectedData.isCheckinEdit = res.isCheckinEdit;
				}
			});
		});


	}

	selectMenuItem(item) {
		let newSelected = '';
		let oldSelected = document.querySelector('.selected-menu-item');

		if (item === '/') newSelected = document.querySelector('#' + 'main-page');
		else {
			let i = item.split('/')[1];
			newSelected = document.querySelector('#' + i);
		}

		if (oldSelected) oldSelected.className = "";
		if (newSelected) newSelected.className = "selected-menu-item";

	}

	showMenu() {
		let x = document.getElementById("side-menu");
		if (!x) return;
		if (x.className === "side-menu") {
			x.className += " show";
		} else {
			x.className = "side-menu";
		}
	}

	hideMenu() {
		let x = document.getElementById("side-menu");
		if (x) x.className += "hide";
	}

	hoverOut() {
		let self = this;
		self.rootScp.$broadcast('mouseOut');
	}
	hoverIn() {
		let self = this;
		self.rootScp.$broadcast('mouseIn');
	}

	setProject(projId) {
		let self = this;
		if (projId === window._injectedData.currentProject) {
			return false;
		};
		window._injectedData.currentProject = projId;
		self.http.sendRequest({
			type: "PUT",
			url: `api/user/${window._injectedData.userId}`,
			body: {
				currentProject: projId,
			}
		}).then(function(res) {
			self.$onInit();
			// let currPath = self.location.path();
			if (self.location.path() === '/noProject' && window._injectedData.currentProject != undefined) {
				self.rootRouter.navigate(['MainPage']);
			} else {
				let newReg = /^(\/)[^(\/)]*/;
				let currPath = self.rootRouter.lastNavigationAttempt.match(newReg)[0];
				self.rootRouter.navigate(['NotFound']);
				self.rootRouter.navigateByUrl(currPath);
				//console.log("Succesfull update currentProject");
			}
		});
		self.http.sendRequest({
			type: "GET",
			url: `api/projects/${window._injectedData.currentProject}/isAdmin/${window._injectedData.userId}`
		}).then(function(res) {
			self.checkinsAccess = res.isCheckinEdit;
			window._injectedData.isReports = res.isReports;
			self.reportsAccess = res.isReports;
			window._injectedData.isCheckinEdit = res.isCheckinEdit;
		});
		self.showMenu();
	}

	projEq(id) {
		return (id === window._injectedData.currentProject);
	}
}

MenuComponentController.$inject = ["httpGeneral", "$location", "$rootRouter", "$scope", '$rootScope'];

const menuComponent = {
	controller: MenuComponentController,
	controllerAs: 'MenuCtrl',
	selector: 'menuComponent',
	template: require('./menu-pug.component.pug')()
};

export {
	menuComponent
};