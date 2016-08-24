import './tasksStyles.styl';


class TasksComponentController {
	constructor(httpGeneral) {
		this.http = httpGeneral;
		console.log('Tasks COMPONENT LOADED');
		this.tasks = [];
		this.contentFlag = true;
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
		self.http.sendRequest(taskReq)
		.then(function(res) {
			self.tasks = res || [];
			self.tasks.forEach(function(task){
				let toDoReq = {
					type: "GET",
					url: `/api/task/${task._id}/todo/`
				};
				self.http.sendRequest(toDoReq)
				.then(function(res){
					task.toDoList = res || [];
					task.progress = 0;
					task.toDoList.forEach(function(toDo){
						(toDo.status === "complete") ? task.progress+=1 : null;
					});
					console.log(self.tasks);
				});
			});
        });

        
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