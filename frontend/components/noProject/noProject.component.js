import './noProject.component.styl';

class noProjectComponentController{
	constructor($location){
		this.location = $location;
	}
}

noProjectComponentController.$inject = ['$location'];

const noProjectComponent = {
    controller: noProjectComponentController,
    selector: 'noProjectComponent',
    template: require('./noProject.component.pug')(),
    controllerAs: 'noProj'
};

export {
    noProjectComponent
};
