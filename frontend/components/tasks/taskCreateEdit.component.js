import './taskCreateEditStyles.styl';

class taskCreateEditController {
	constructor(httpGeneral,popupNotifications,$timeout,$location) {
		this.http = httpGeneral;
		this.popup = popupNotifications;
		this.timeout = $timeout;
        this.location = $location;
		this.userListFlag = false;
		this.editMode;
		this.users;
		this.task = {};
		this.tinyOptions = {
            inline: true,
            theme: 'inlite',
            plugins: 'image link paste contextmenu textpattern autolink lists',
            insert_toolbar: false,
            selection_toolbar: 'bold italic | quicklink h2 h3 blockquote | bullist numlist outdent indent',
            selector: '.descEditor'
        };
	}
	$onInit(){
		let self = this;
		let userReq = {
			type: "GET",
			url: `/api/projects/${window._injectedData.currentProject}/withUsers`,
			errorCallback(){
				self.popup.notifyError('Proj. Participants load error!');
			}
		};
		self.http.sendRequest(userReq).then(function(res){
			self.users = res.participants;
		});
	}


	$routerOnActivate(next){
		let self = this;
		self.editMode = !(next.params.id === "new");
		if(self.editMode){
			let taskReq = {
				type: "GET",
				url: `/api/task/populated/${next.params.id}`,
				errorCallback(err){
					self.popup.notifyError('Failed to Load Task Data');
					self.location.path('/tasks');
				}
			};
			self.http.sendRequest(taskReq).then((res) => {
				self.task = res;
			});

		}else{
			self.task = {
				title: "",
				description: "",
				participants: [],
				toDos: [],
				files: []
			};
		};
	}

	onUserSelect(user){
		function filterArrayUsers(element){
			let eq;
			if( element._id == user._id ){
				eq = true;
			}else{
				eq = false;
			};
			return eq;
		};
		let self = this.parentScope;
		let repeat = self.task.participants.find(filterArrayUsers);

		if(repeat){
			self.popup.notifyError('already added!');
		}else{
			self.task.participants.push(user);
		};

		self.userListFlag = false;
	}

	removeParticipant(user){
		let self = this;
		self.task.participants.find((element, index, array) => {
			let eq;
			if(element._id === user._id){
				array.splice(index,1);
				eq = true;
			}else{
				eq = false;
			};
			return eq;
		});
	};

	addToDo(){
		let self = this;
		self.task.toDos.push(
			{
				title: '',
				description: '',
				status: 'uncomplete'
			});
		self.timeout(function(){
			let element = document.getElementById("addtodo");
			window.scrollTo(0,element.offsetTop-250);
		},100,false);
	}

	removeToDo(todo,index){
		let self = this;
		todo.status = "removed";
		if(!self.editMode || !todo._id){
			self.task.toDos.splice(index,1);
		};	
	}

	saveTask(){
		let self = this;
		let errTaskTitle;
		self.task.participants = self.task.participants.map((elem) => {return elem._id;});
		self.task.files = self.task.files.map((elem) => {return elem._id;});
		self.task.toDos.forEach((todo)=>{
			if(!todo.title){
				errTaskTitle = true;
			};
		});
		let taskUpdateReq = (self.editMode) ? {
			type: "PUT",
			url: `/api/task/${self.task._id}`,
			body: self.task,
			errorCallback(err){
				self.popup.notifyError(err);
			}
		} : {
			type: "POST",
			url: "/api/task/",
			body:{
				data: {
					title: self.task.title,
					description: self.task.description,
					participants: self.task.participants,
					files: self.task.files,
					author: window._injectedData.userId,
					isFinished: false,
					archived: false,
					project: window._injectedData.currentProject,
					toDos: self.task.toDos
				}
			},
			errorCallback(err){
				self.popup.notifyError(err);
			}
		};
		if(!self.task.title){
			self.popup.notifyError('Task title reuired');
		}else if(errTaskTitle){
			self.popup.notifyError('ToDo title required');
		}else{
			self.http.sendRequest(taskUpdateReq).then(function(res){
				if(res.ok){
				self.location.path('/tasks');
			};
		});
		};

	}


};

taskCreateEditController.$inject = [
	"httpGeneral",
	"popupNotifications",
	"$timeout",
    "$location"
];

const taskCreateEditComponent = {
	controller: taskCreateEditController,
	selector: "taskCreateEditComponent",
	template: require('./taskCreateEditTemplate.pug')(),
	controllerAs: "taskCE"
};

export{
	taskCreateEditComponent
};