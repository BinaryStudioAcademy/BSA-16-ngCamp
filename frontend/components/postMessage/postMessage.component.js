import './postMessage.styl';

class postMessageController {
    constructor(httpGeneral,$window,$location) {
    	this.httpGeneral = httpGeneral;
    	this.window = $window;
    	this.location = $location;
    	this.title;
    	this.desc;
    	this.date = new Date();
    }
    post(){
    	let self = this;
    	self.httpGeneral.sendRequest({
    		type:"POST",
    		url:"api/messages",
    		body:{
    			data:{
    				title:self.title,
    				description:self.desc,
    				project:window._injectedData.currentProject,
    				data:self.date,
    				author:window._injectedData.userId,
    				isDraft:false,
    			}
    		}
    	}).then(function(res){
    		console.log("Succesfull create new message");
    		self.window.location.reload();
    		self.location.path('/messageboard');
    	});
    }
}

postMessageController.$inject = ['httpGeneral','$window','$location'];

const postMessageComponent = {
    controller: postMessageController,
    controllerAs: 'postCtrl',
    template: require('./postMessage.pug')(),
    selector: 'postMessage'
};

export {postMessageComponent};