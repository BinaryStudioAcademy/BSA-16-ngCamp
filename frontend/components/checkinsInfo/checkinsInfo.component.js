import './checkinsInfoStyles.styl';

class CheckinsInfoComponentController {
    constructor(httpGeneral) {
        this.httpGeneral = httpGeneral;
        this.checkin = null;
        this.answers = [];
        this.groupedAsnwers = {};
        this.iter = [];
        this.days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        this.months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    }
    $routerOnActivate(next){
    	let vm = this;
    	vm.httpGeneral.sendRequest({
    		type:"GET",
    		url:`/api/checkins/${next.params.id}/withparticipants`
    	}).then(function(res){
    		vm.checkin = res;                          //{_id: res_id, question: res.question}
            vm.answers = res.answers;
            vm.answers.forEach(function(answer){
                let date = new Date(answer.creationDate);
                let month = vm.months[date.getMonth()];
                let dayofMonths = date.getDate();
                let dayOfWeek = vm.days[date.getDay()];
                let d = dayOfWeek+', '+ month + ' ' + dayofMonths;

                if(!vm.groupedAsnwers[d]){
                    vm.iter.push(d);
                    vm.groupedAsnwers[d] = [];
                }
                vm.groupedAsnwers[d].push(answer);
            });

    	});
        console.log(vm.groupedAsnwers);
    }
    deleteCheckin(){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type:"DELETE",
            url:'/api/checkins/' + vm.checkin._id
        }).then(function(res){
            console.log(res);
        });
    }
}

CheckinsInfoComponentController.$inject = ['httpGeneral'];

const checkinsInfoComponent = {
    controller: CheckinsInfoComponentController,
    controllerAs: 'chInfo',
    selector: 'checkinsInfoComponent',
    template: require('./checkinsInfo-pug.component.pug')()
};

export {
    checkinsInfoComponent
};