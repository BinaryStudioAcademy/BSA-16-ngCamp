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

		}else{
			self.task = {
				title: "",
				description: "",
				participants: [],
				toDos: []
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
		console.log(repeat);

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
			window.scrollTo(0,element.offsetTop);
		},100,false);
	}

	removeToDo(index){
		let self = this;
		self.task.toDos.splice(index,1);
	}

	saveTask(){
		let self = this;
		let participantsIdList = self.task.participants.map((elem) => {return elem._id;});
		let taskUpdateReq = (self.editMode) ? {

		} : {
			type: "POST",
			url: "/api/task/",
			body:{
				data: {
					title: self.task.title,
					description: self.task.description,
					participants: participantsIdList,
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
		self.http.sendRequest(taskUpdateReq).then(function(res){
            self.location.path('/tasks');
		});
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