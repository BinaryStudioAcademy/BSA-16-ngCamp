import './tasksStyles.styl';


class TasksComponentController {
	constructor(httpGeneral) {
		this.http = httpGeneral;
		this.tasks = [];
		this.contentFlag = true;
		this.projUsers = [];
	}

	$onInit(){
		let self = this;
		let taskReq = {
			type: "GET",
			url: `api/task/allFromProject/${window._injectedData.currentProject}`,
			errorCallback(){
				self.contentFlag = false;
			}
		};
		let projReq = {
			type: "GET",
			url: `api/projects/${window._injectedData.currentProject}/withUsers`
		};
		self.http.sendRequest(projReq).then(function(res){
			self.projUsers = res.participants;
			console.log(self.projUsers);
		});
		self.http.sendRequest(taskReq)
		.then(function(res) {
			self.tasks = res || [];
			self.tasks.forEach(function(task){
				task.expanded = false;
				self.calcProgress(task);
				});
			console.log(self.tasks);
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
				status: todo.status
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
					isFinished: task.isFinished
				}
			};
			self.http.sendRequest(statusChangeReq);
		};
	}

	selectUser(user){
		console.log(user);
	}

	}
	

TasksComponentController.$inject = [
	'httpGeneral'
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