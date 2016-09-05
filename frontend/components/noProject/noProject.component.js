import './noProject.component.styl';

class noProjectComponentController{
	constructor(){

	}
}

noProjectComponentController.$inject = [];

const noProjectComponent = {
    controller: noProjectComponentController,
    selector: 'noProjectComponent',
    template: require('./noProject.component.pug')(),
    controllerAs: 'noProj'
};

export {
    noProjectComponent
};
