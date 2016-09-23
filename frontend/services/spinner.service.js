class spinner{

	constructor($timeout,spinner){
		this.el = angular.element(document.querySelector('body'));
		this.spinner = angular.element(require('../templates/spinner.pug')());
		this.count = 0;
		this.timeout = $timeout;
		this.promise;

	}

	startSpinn(){
		let self =this;

		if(this.count == 0){
			this.promise = this.timeout( function(){
				self.el.children().prop('style','pointer-events : none;');
				self.el.append(self.spinner);
			},200);
		};
		this.count +=1;
	}

	stopSpinn(){

		if(this.count == 1){

		this.timeout.cancel(this.promise);
		this.spinner.remove();
		this.el.children().prop('style','');

		};

		this.count -= 1;
	}

};

spinner.$inject = ['$timeout'];

export {spinner};