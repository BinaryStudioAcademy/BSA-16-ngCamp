import './messageBoard.styl';

class messageBoardController {
    constructor(httpGeneral,$location,$window) {
    	this.httpGeneral = httpGeneral;
    	this.location = $location;
    	this.window = $window;
    	this.messages = [];
    }
    $onInit(){
    	let self = this;
    	self.httpGeneral.sendRequest({
    		type:"GET",
    		url:"api/messages"
    	}).then(function(res){
    		for (let msg in res){
    			if (res[msg].project == window._injectedData.currentProject){
    				self.messages.push(res[msg]);
    			}
    		};
    	});
    }
}

messageBoardController.$inject = ['httpGeneral','$location','$window'];

const messageBoardComponent = {
    controller: messageBoardController,
    controllerAs: 'msgBoard',
    template: require('./messageBoard.pug')(),
    selector: 'messageBoard'
};

export {messageBoardComponent};