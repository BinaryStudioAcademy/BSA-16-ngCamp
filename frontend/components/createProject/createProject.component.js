import './createProject.component.styl';

class createProjectController {
	constructor(httpGeneral,$location) {
		this.http = httpGeneral;
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
        self.httpGeneral.sendRequest({
            type: "GET",
            url: "api/user"
        }).then(function(res) {
            self.users = res;
        });
    }

	save(){
		let self = this;
		self.httpGeneral.sendRequest({
			type: "POST",
			url: "api/porjects",
			body: {
				data: {
					title:self.projectTitle,
					description:self.projectDescription,
					participants:self.participants,
					endDate:self.deadline,
					startDate: new Date(),
				}
			}
		}).then(function(res){
			console.log("Succesfull create project");
		});
	}

	participantUpdate(){
		let self = this;
		self.participantsSet.add(self.userToAdd);
		self.participants = Array.from(self.participantsSet);
	}

	participantDelete(id){
		let self = this;
		self.participantsSet.delete(self.id);
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