class TasksComponentController {
	constructor(httpGeneral,$timeout,$filter,popupNotifications) {
		this.http = httpGeneral;
		this.tasks = [];
		this.contentFlag = true;
		this.projUsers = [];
		this.currUserId = window._injectedData.userId;
		this.timeout = $timeout;
		this.filter = $filter;
		this.popup = popupNotifications;
		this.keyword;
		this.filterKey;
	}

	$onInit(){
		let self = this;
		let taskReq = {
			type: "GET",
			url: `api/task/allFromProject/${window._injectedData.currentProject}`,
			errorCallback(){
				self.contentFlag = false;
				self.popup.notifyError('Tasks download Error!');
			}
		};
		let projReq = {
			type: "GET",
			url: `api/projects/${window._injectedData.currentProject}/withUsers`,
			errorCallback(){
				self.popup.notifyError('Project download Error!');
			}	
		};
		self.http.sendRequest(projReq).then(function(res){
			self.projUsers = res.participants;
		});
		self.http.sendRequest(taskReq)
		.then(function(res) {
			self.tasks = res || [];
			self.tasks.forEach(function(task){
				task.expanded = false;
				self.calcProgress(task);
				});
			});
    }

	calcProgress(task){
		let self = this;
		task.progress = 0;
		task.toDos.forEach(function(toDo){
			(toDo.status === "complete") ? task.progress+=1 : null;
		});

		return self;
	}

	changeToDoState(todo,task){
		let self = this;
		(todo.status === "complete") ? (todo.status = "uncomplete") : (todo.status = "complete");
		let statusChangeReq = {
			type: "PUT",
			url: `/api/task/${task._id}/todo/${todo._id}`,
			body: {
				title: todo.title,
				task: task._id,
				status: todo.status
			},
			errorCallback(err) {
				self.popup.notifyError(err);
			}
		};
		self.calcProgress(task).changeTaskState(task);
		self.http.sendRequest(statusChangeReq);		
	}

	changeTaskState(task){
		let self = this;
		let state = task.isFinished;

		if( task.progress === task.toDos.length ){
			task.isFinished = true;
		}else{
			task.isFinished = false;
		};

		if( state != task.isFinished ){
			let statusChangeReq = {
				type: "PUT",
				url: `/api/task/${task._id}`,
				body: {
					title: task.title,
					project: task.project,
					author: task.author,
					isFinished: task.isFinished
				},
				errorCallback(err) {
					self.popup.notifyError(err);
				}	
			};
			self.http.sendRequest(statusChangeReq);		
		};		
	}

	expand(task){
		let self = this;
		task.expanded = !task.expanded;
		self.timeout(function(){
			let element = document.getElementById(task._id);
			window.scrollTo(0,element.offsetTop);
		},0,false);
	}

	takePart(task){
		let self = this;
		let takePartReq = {
			type: "PUT",
			url: `/api/task/${task._id}/addParticipant`,
			body: {
				participantId: self.currUserId
			},
			errorCallback(){
				self.popup.notifyError('Participants update Error!');
			}
		};
		self.http.sendRequest(takePartReq).then(function(res = {}){
			if(res.ok){
				let userObj = self.filter('filter')(self.projUsers,{_id: self.currUserId})[0];
				task.participants.push(userObj);
			};
		});


	}

	leaveTask(task){
		let self = this;
		let memberIndex;
		let leaveTaskReq = {
			type: "PUT",
			url: `/api/task/${task._id}/removeParticipant`,
			body : {
				participantId: self.currUserId
			},
			errorCallback(){
				self.popup.notifyError('Participants update Error!');
			}
		};

		self.http.sendRequest(leaveTaskReq).then(function(res = {}){
			if(res.ok){
				task.participants.find(function(element,index){
					if(element._id === self.currUserId){
						task.participants.splice(index,1);
						return true;
					}else{
						return false;
					}
				});
			}
		});
	}

	changeFilter(type){
		let self = this;
		switch(type){
			case 'my':
				self.filterKey = myTasksFilter;
				break;
			case 'free':
				self.filterKey = emptyArrayFilter;
				break;
			case 'done':
				self.filterKey = {isFinished: true};
				break;
			case 'none':
				self.filterKey = '';
				self.keyword = '';
				break;
		};

		function emptyArrayFilter(element){
			return !element.participants.length;
		};
		function myTasksFilter(element){
			let count = 0;
			element.participants.forEach(function(elem){
				if (elem._id === self.currUserId) {
					count +=1;
				};
			});
			return !!count;

		}
	}

	deleteTask(id,index){
		let self = this;
		let deleteReq = {
			type: "DELETE",
			url: `/api/task/${id}`,
			errorCallback(err){
				self.popup.notifyError(err);
			}
		};
		self.http.sendRequest(deleteReq).then(function(res){
			if(res){
				self.tasks.splice(index,1);
			};
		});
	}



	}
	

TasksComponentController.$inject = [
	'httpGeneral',
	'$timeout',
	'$filter',
	'popupNotifications'
];

const tasksComponent = {
	controller: TasksComponentController,
	selector: 'tasksComponent',
	template: require('./tasksTemplate.pug')(),
	controllerAs: 'tasksctrl'
};

export {
	tasksComponent
};