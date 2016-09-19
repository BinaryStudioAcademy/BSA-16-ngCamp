import "./answer.styl";

class AnswerComponentController{
    constructor(httpGeneral,$location){
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.options = ['all','answered','unanswered' ];
        this.selectedAnswer = '';
        this.checkins = [];      
    }

    $onInit(){
    	let vm = this;
    	vm.httpGeneral.sendRequest({
    		type:"GET",
    		url:`api/checkins/answercheckin/${window._injectedData.userId}/${window._injectedData.currentProject}`
    	}).then(function(res){
            if (res){
                res.forEach(function(checkin){
                    // console.log(checkin);
                    vm.checkins.push(checkin);
                });
                console.log(vm.checkins);
            }

    	});
        // if (window._injectedData.currentProject === undefined) {
        //     self.rootRouter.navigateByUrl('/noProject');
        // }
    }

    goToAnswer(chcknId, answerToken){
        let vm = this;
        // console.log(id);
        // console.log(token);
        
        // http://localhost:3060/#/checkins/answer/57dd9c13fc6406801047cde3/0j7902jjq50c72wl
        // let url = "/checkins/answer?checinId=" +( id || "") + "&id=" + ( token || "");

        // var url = "/joboffers?keywords=" +( vm.keywords || "") + "&location=" + (vm.location || "");
        // vm.location.path('/checkins/answer').search({checkinId: chcknId});
        let url  = '/checkins/answer/'+ chcknId + '/' + answerToken;
         vm.location.url(url);
        //   $location.absUrl() === 'http://example.com/new?x=y'
        // $location.path('/newValue').search({key: value});
        // vm.location.url(url);
    }

    // filterAnswers(){
    //     let vm = this;
    //     console.log(vm.selectedAnswer);
    //     // let vm = this;
    //     // if (vm.selectedAnswer === 'answered'){
    //     //     return function(elem) {
    //     //         console.log(vm.selectedAnswer);
    //     //         return (elem.creationDate != elem.editedDate) ? true : false;
    //     //     };
    //     // }
        
    // }
    // answerFilt(){
    //     let vm = this;
    //     if (vm.selectedAnswer === 'answered'){
    //         return function(elem) {
    //             console.log(vm.selectedAnswer);
    //             return (elem.creationDate != elem.editedDate) ? true : false;
    //         };
    //     }
    // }
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