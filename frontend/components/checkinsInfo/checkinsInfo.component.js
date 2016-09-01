import './checkinsInfoStyles.styl';

class CheckinsInfoComponentController {
    constructor(httpGeneral) {
        this.httpGeneral = httpGeneral;
        this.checkin = null;
    }
    $routerOnActivate(next){
    	let vm = this;
    	vm.httpGeneral.sendRequest({
    		type:"GET",
    		url:`/api/checkins/${next.params.id}`
    	}).then(function(res){
    		vm.checkin = res;
    	});
    }
}

CheckinsInfoComponentController.$inject = ['httpGeneral'];

const checkinsInfoComponent = {
    controller: CheckinsInfoComponentController,
    selector: 'checkinsInfoComponent',
    template: require('./checkinsInfo-pug.component.pug')()
};

export {
    checkinsInfoComponent
};