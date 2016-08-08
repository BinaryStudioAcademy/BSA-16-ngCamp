class spinner{

	constructor(spinner){
		this.el = angular.element(document.querySelector('body'));
		this.spinner = angular.element(require('../templates/spinner.pug')());
		this.count = 0;

	}

	startSpinn(){

		if(this.count == 0){
			this.el.prop('style','opacity: 0.5; pointer-events : none;');
			this.el.append(this.spinner);
		};
		this.count +=1;
	}

	stopSpinn(){

		if(this.count == 1){
			this.spinner.remove();
			this.el.children().prop('style','');
		};

		this.count -= 1;
	}

};

spinner.$inject = [];

export {spinner};