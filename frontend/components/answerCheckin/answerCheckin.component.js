import "./answer.styl";

class AnswerComponentController {
    constructor(httpGeneral, $location) {
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.options = ['all', 'answered', 'unanswered'];
        this.selectedAnswer = '';
        this.checkins = [];
    }

    $onInit() {
        let vm = this;
        vm.httpGeneral.sendRequest({
            type: "GET",
            url: `api/checkins/answercheckin/${window._injectedData.userId}/${window._injectedData.currentProject}`
        }).then(function(res) {
            if (res) {
                res.forEach(function(checkin) {
                    vm.checkins.push(checkin);
                });
                console.log(res);
            }
        });
        // if (window._injectedData.currentProject === undefined) {
        //     self.rootRouter.navigateByUrl('/noProject');
        // }
    }

    goToAnswer(chcknId, answerToken) {
        let vm = this;
        let url = '/checkins/answer/' + chcknId + '/' + answerToken;
        vm.location.url(url);
    }

};

AnswerComponentController.$inject = ['httpGeneral', '$location'];

const answerCheckinComponent = {
    controller: AnswerComponentController,
    controllerAs: 'answr',
    selector: "answerCheckinComponent",
    template: require("./answer.template.pug")()
};

export {
    answerCheckinComponent
};