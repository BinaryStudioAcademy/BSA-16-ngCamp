import "./answer.styl";

class AnswerComponentController{
    constructor(httpGeneral,$location){
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.options = ['all','answered','unanswered' ];
        this.selectedAnswer = '';
        this.checkins = [];      
    }
    //  need proverka!!!!!!!!!!!!!!!
    $onInit(){
    	let vm = this;
    	vm.httpGeneral.sendRequest({
    		type:"GET",
    		url:`api/checkins/answercheckin/${window._injectedData.userId}/${window._injectedData.currentProject}`
    	}).then(function(res){
            res.forEach(function(checkin){
                // console.log(checkin);
                vm.checkins.push(checkin);
            });
    		console.log(vm.checkins);
    	});
        // if (window._injectedData.currentProject === undefined) {
        //     self.rootRouter.navigateByUrl('/noProject');
        // }
    }
    filterAnswers(){
        let vm = this;
        console.log(vm.selectedAnswer);
    }
};

AnswerComponentController.$inject = ['httpGeneral','$location'];

const answerCheckinComponent = {
    controller: AnswerComponentController,
    controllerAs: 'answr',
    selector: "answerCheckinComponent",
    template: require("./answer.template.pug")()
};

export {
    answerCheckinComponent
}; 