import './createProject.component.styl';

class createProjectController {
	constructor(httpGeneral,$location) {
		this.http = httpGeneral;
		this.location = $location;
		this.projectTitle;
		this.projectDescription;
		this.participants = [],
		this.participantsSet = new Set();
		this.users;
		this.status = "active";
		this.popup = {
            opened: false
        };
        this.today;
        this.deadline = new Date();
        this.modalFlag = false;
        this.userToAdd;
	}

	$onInit() {
        let self = this;
        self.projectParticipants = [];
        self.http.sendRequest({
            type: "GET",
            url: "api/user"
        }).then(function(res) {
            self.users = res;
            self.userToAdd = self.users[0]._id;
        });
    }

	save(){
		let self = this;
		self.participantsSet.add(window._injectedData.userId);
		self.participants = Array.from(self.participantsSet);
		self.http.sendRequest({
			type: "POST",
			url: "api/projects/",
			body: {
				data: {
					title:self.projectTitle,
					description:self.projectDescription,
					participants:self.participants,
					endDate:self.deadline,
					startDate: new Date(),
					status: 'active'
				}
			}
		}).then(function(res){
			console.log("Succesfull create project");
		});
		self.location.path('/');
	}

	participantUpdate(){
		let self = this;
		self.participantsSet.add(self.userToAdd);
		self.participants = Array.from(self.participantsSet);
	}

	getUserNameById(id){
		let self = this;
		let user = self.users.find((element) => {
			return element._id === id;
		});

		return `${user.firstName} ${user.lastName}`;
	}

	participantDelete(id){
		let self = this;
		console.log(id);
		self.participantsSet.delete(id);
		self.participants = Array.from(self.participantsSet);
	}

	modalToggle() {
        this.modalFlag = !this.modalFlag;
    }
    today () {
        this.dt = new Date();
    };
    open() {
        this.popup.opened = true;
    }
}

createProjectController.$inject = [
	'httpGeneral',
	'$location',
];

const createProjectComponent = {
	controller: createProjectController,
	selector: 'createProjectComponent',
	template: require('./createProject-pug.component.pug')(),
	controllerAs: 'createProj'
};

export {
	createProjectComponent
};