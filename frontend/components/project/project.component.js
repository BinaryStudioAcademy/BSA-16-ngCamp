import './project.component.styl';

class ProjectComponentController {

	constructor(popupNotifications, httpGeneral, $location, $window, $rootRouter, $rootScope, $timeout, $compile, $scope) {
		this.popupNotifications = popupNotifications;
		this.compile = $compile;
		this.scope = $scope;
		this.httpGeneral = httpGeneral;
		this.timeout = $timeout;
		this.window = $window;
		this.userProjects;
		this.rootRouter = $rootRouter;
		this.userReq = {
			type: "GET",
			url: "api/projects/forCurrentUser",
		};
		this.location = $location;
		this.flag = true;
		this.id = null;
		this.currentProjectId = window._injectedData.currentProject || '';
		this.currentProject;
		this.projectParticipators;
		this.addParticipatorFlag = false;
		this.participatorToAdd;
		this.participatorToDelete;
		this.users;
		this.projectParticipants = [];
		this.projectAdmins = [];
		this.editName = false;
		this.editDesc = false;
		this.popup = {
			opened: false
		};
		this.today;
		this.dtDeadline = new Date();
		this.editDeadline = false;
		this.editDesc = false;
		this.modalFlag = false;
		this.isUserAdmin = false;
		this.datePickerOpt = {
			minDate: new Date()
		};
		this.userListFlag = false;
		this.adminListFlag = false;
		this.rootScope = $rootScope;
		this.timezone = (((new Date()).getTimezoneOffset() / 60) * -100).toString();
		this.tinyOptions = {
			inline: true,
			theme: 'inlite',
			auto_focus: true,
			plugins: 'image link paste contextmenu textpattern autolink lists',
			insert_toolbar: 'quickimage',
			selection_toolbar: 'bold italic | quicklink h2 h3 blockquote | bullist numlist outdent indent',
			selector: '.descEditor'
		};
	}

	isAdmin() {
		let self = this;
		for (let i = 0; i < self.projectAdmins.length; i++) {
			if (self.projectAdmins[i]._id === window._injectedData.userId) self.isUserAdmin = true;
		}
	}

	isUser(id) {

		if (window._injectedData.userId === id) {
			return true;
		};

		return false;
	}


	$onInit() {
		let self = this;
		self.projectParticipants = [];
		self.httpGeneral.sendRequest({
			type: "GET",
			url: "api/user"
		}).then(function(res) {
			self.users = res;
			self.httpGeneral.sendRequest({
				type: "GET",
				url: `api/projects/${window._injectedData.currentProject}/withUsers`,
			}).then(function(res) {
				self.currentProject = res;
				self.projectParticipants = res.participants;
				self.projectAdmins = res.admins;
				self.dtDeadline = res.endDate;
				self.isAdmin();
			});
		});
		if (window._injectedData.currentProject === undefined) {
			self.rootRouter.navigateByUrl('/noProject');
		}
	}

	addParticipator() {
		let self = this;
		self.httpGeneral.sendRequest({
			type: "POST",
			url: `api/projects/${self.currentProjectId}/participants`,
			body: {
				data: [self.participatorToAdd],
			},
		}).then(function(res) {
			if (res.ok) {
				self.projectParticipants.push(self.participatorToAdd);
			};
			self.participatorToAdd = "";
		});
		self.addParticipatorFlag = false;
	}

	removeParticipant(participator) {
		let self = this;
		self.httpGeneral.sendRequest({
			type: "DELETE",
			url: `api/projects/${self.currentProjectId}/participants/${participator}`,
		}).then(function(res) {
			if (res.ok) {
				self.projectParticipants.forEach(function(elem, index, array) {
					if (elem._id === participator) {
						array.splice(index, 1);
						self.projectAdmins.forEach((elem, index, array) => {
							if (elem._id === participator) {
								self.removeAdmin(participator);
							};
						});
					};
				});
			};
		});
	}

	onUserSelect(user) {
		function filterArrayUsers(element) {
			let eq;
			if (element._id == user._id) {
				eq = true;
			} else {
				eq = false;
			};
			return eq;
		};
		let self = this.parentScope;
		let repeat = self.projectParticipants.find(filterArrayUsers);

		if (repeat) {
			self.popupNotifications.notifyError('already added!');
		} else {
			self.participatorToAdd = user;
			self.addParticipator();
		};

		self.userListFlag = false;
	}

	onAdminSelect(user) {
		function filterArrayUsers(element) {
			let eq;
			if (element._id == user._id) {
				eq = true;
			} else {
				eq = false;
			};
			return eq;
		};
		let self = this.parentScope;
		let repeat = self.projectAdmins.find(filterArrayUsers);
		if (repeat) {
			self.popupNotifications.notifyError('already added!');
		} else {
			//self.projectAdmins.push(user);
			self.adminToAdd = user;
			self.addAdmin();
		};

		self.adminListFlag = false;
	}

	addAdmin() {
		let self = this;
		let duplicateAdmin = false;
		console.log(self.adminToAdd);
		for (let i in self.projectAdmins) {
			if (self.projectAdmins[i]._id === self.adminToAdd._id) {
				duplicateAdmin = true;
			}
		};
		let participantsMatches = self.projectParticipants.find((elem) => {
			return elem._id === self.adminToAdd._id;
		});

		if (!duplicateAdmin) {
			self.projectAdmins.push(self.adminToAdd);
			self.httpGeneral.sendRequest({
				type: "PUT",
				url: `api/projects/${self.currentProjectId}`,
				body: {
					admins: self.projectAdmins,
				},
			}).then(function(res) {
				if (!participantsMatches) {
					self.participatorToAdd = self.adminToAdd;
					self.addParticipator();
				};
				self.adminToAdd = "";
			});
		}
		self.addAdminFlag = false;
	}

	removeAdmin(participator) {
		let self = this;
		self.httpGeneral.sendRequest({
			type: "DELETE",
			url: `api/projects/${self.currentProjectId}/admins/${participator}`,
		}).then(function(res) {
			if (res.ok) {
				self.projectAdmins.forEach(function(elem, index, array) {
					if (elem._id === participator) {
						array.splice(index, 1);
					};
				});
			};
		});
	}

	edit(prop, valid) {
		let self = this;
		if (valid || prop === "deadline") {
			switch (prop) {
				case "title":
					{
						self.editName = false;
						self.httpGeneral.sendRequest({
							type: "PUT",
							url: `api/projects/${self.currentProjectId}`,
							body: {
								title: self.currentProject.title,
							}
						}).then(function(res) {
							console.log("Succesfull edit title");
							self.popupNotifications.notifySuccess("You change title Succesfully");
							self.rootScope.$broadcast('menuReload');
						});
						break;
					}
				case "description":
					{
						self.httpGeneral.sendRequest({
							type: "PUT",
							url: `api/projects/${self.currentProjectId}`,
							body: {
								description: self.currentProject.description,
							}
						}).then(function(res) {
							console.log("Succesfull edit description");
							self.popupNotifications.notifySuccess("You change description Succesfully");
						});
						break;
					}
				case "deadline":
					{
						self.dtDeadline.setMinutes(self.dtDeadline.getMinutes() - self.dtDeadline.getTimezoneOffset());
						self.editDeadline = false;
						self.httpGeneral.sendRequest({
							type: "PUT",
							url: `api/projects/${self.currentProjectId}`,
							body: {
								endDate: self.dtDeadline,
							}
						}).then(function(res) {
							console.log("Succesfull edit deadline");
							self.popupNotifications.notifySuccess("You change deadline Succesfully");
						});
						break;
					}
			}
		} else {
			self.popupNotifications.notifyError("Please enter new info correctrly");
		}
	}
	modalToggle() {
		this.modalFlag = !this.modalFlag;
	}

	deleteProject() {
		let self = this;
		console.log(self);
		self.httpGeneral.sendRequest({
			type: "DELETE",
			url: `api/projects/${window._injectedData.currentProject}`
		}).then(() => {
			window._injectedData.currentProject = '';
			self.rootRouter.navigate(['NoProject']);
			self.rootScope.$broadcast('menuReload');
		});
	}

	today() {
		this.dt = new Date();
	};

	open() {
		this.popup.opened = true;
	}

	localDate(date) {
		let newDate = new Date(date);
		return newDate.toLocaleDateString();
	}
	editNameActivate() {
		let self = this;
		if (!self.editDesc && self.isUserAdmin) {
			self.editName = true;
			self.timeout(function() {
				window.document.querySelector("#projTitleInput").focus();
				window.document.querySelector("#projTitleInput").onblur = function() {
					self.timeout(function() {
						if (window.document.querySelector("#projTitleInput")) {
							window.document.querySelector("#projTitleInput").focus();
						};
					}, 10, true);
				};
			}, 0, true);
		}
	}
	isSelected() {
		if (window.getSelection().type != 'Range' || !this.editDesc) {
			return true;
		}
		return false;
	}

	descToggle() {
		let self = this;
		if (self.editDesc) {
			self.edit('description', true);
		};
		if (!self.editName && self.isUserAdmin && (window.getSelection().type != 'Range')) {
			self.editDesc = !self.editDesc;
		};
	};

	editDateToggle() {
		let self = this;
		if(self.isUserAdmin){
			self.editDeadline = !self.editDeadline;
		};
	}

	callModal() {
		let self = this;
		self.popupNotifications.notifyConfirm('Warning', 'This action will delete Project','Ok','Cancel',() => {
			self.httpGeneral.sendRequest({
			type: "DELETE",
			url: `api/projects/${window._injectedData.currentProject}`
		}).then(() => {
			window._injectedData.currentProject = '';
			self.rootRouter.navigate(['NoProject']);
			self.rootScope.$broadcast('menuReload');
		});
		});
	}
}

ProjectComponentController.$inject = ['popupNotifications', 'httpGeneral', '$location', '$window', '$rootRouter', '$rootScope', '$timeout', '$compile', "$scope"];

const projectComponent = {
	controller: ProjectComponentController,
	selector: 'projectComponent',
	template: require('./project.component.pug')(),
	controllerAs: 'proj',
};


export {
	projectComponent
};