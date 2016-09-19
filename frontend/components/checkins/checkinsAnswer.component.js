import './checkinsStyles.styl';

class CheckinsAnswerController {
    constructor(httpGeneral, $location) {
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.body = '';
        this.question = '';
        this.answerIndex;
        this.token = '';
    }

    $routerOnActivate(next){
        let vm = this;
        vm.token = next.params.id;
        vm.checkinId = next.params.checkinId;
        console.log(next.params);
        vm.httpGeneral.sendRequest({
            type:"GET",
            url:`/api/checkins/answer/${next.params.checkinId}/${next.params.id}`
        }).then(function(res){
            vm.question = res[0].question;
            if (res[0].answer == 'noAnswer'){
                vm.body = '';
            } else {
                vm.body = res[0].answer;
            }
            
        });
    }
    
    post(next){
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "PUT",
            url: "/api/checkins/answer/" + vm.checkinId + '/' + vm.token,
            body: {
                 answer: vm.body 
            }
        }).then(function(res) {
            //console.log(res);
            vm.location.path('/checkins');
        });
    }
}

CheckinsAnswerController.$inject = [
        'httpGeneral',
        '$location'

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
