import './checkinsStyles.styl';


class CheckinsAnswerController {
    constructor(httpGeneral) {
        this.httpGeneral = httpGeneral;
        this.body = '';
        this.checkin = null;
        this.answerIndex;
        this.token = '';
    }
    $routerOnActivate(next){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type:"GET",
            url:`/api/checkins/answer/${next.params.id}`
        }).then(function(res){
            vm.checkin = res;
            vm.token = next.params.id;
            vm.answerIndex = vm.checkin.answers.findIndex(x => x.token == next.params.id);
            vm.body = vm.checkin.answers[vm.answerIndex].answer;
        });

    }
    post(next){
        let vm = this;
        vm.checkin.answers[vm.answerIndex].answer = vm.body;
        vm.httpGeneral.sendRequest({
            type: "PUT",
            url: "/api/checkins/answer/" + vm.token,
            body: {
                 answer: vm.body 
            }
        }).then(function(res) {
            //console.log(res);
            //vm.location.path('/checkins');
        });
    }

}

CheckinsAnswerController.$inject = [
        'httpGeneral'
];



const checkinsAnswerComponent = {
    controller: CheckinsAnswerController,
    controllerAs: 'checkinsAnswer',
    selector: 'checkinsAnswerComponent',
    template: require('./checkinsAnswer-pug.component.pug')()
};

export {
    checkinsAnswerComponent
};
