import './mainStyles.styl';

class MainComponentController {
	constructor(){
	}
};

MainComponentController.$inject = [];

const mainComponent = {
	controller: MainComponentController,
	selector: 'mainComponent',
	template: require('./main-pug.component.pug')()
};

export {
	mainComponent
};