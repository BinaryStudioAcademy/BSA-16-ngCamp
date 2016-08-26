import './postMessage.styl';

class postMessageController {
    constructor(httpGeneral,$window,$location,popupNotifications) {
    	this.httpGeneral = httpGeneral;
    	this.window = $window;
    	this.location = $location;
        this.popupNotifications = popupNotifications;
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
    				date:self.date,
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

    draft(){
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
                    isDraft:true,
                }
            }
        }).then(function(res){
            console.log("Succesfull create new draft");
            self.popupNotifications.notifySuccess("Succesfull create draft");
        });
    }
}

postMessageController.$inject = ['httpGeneral','$window','$location','popupNotifications'];

const postMessageComponent = {
    controller: postMessageController,
    controllerAs: 'postCtrl',
    template: require('./postMessage.pug')(),
    selector: 'postMessage'
};

export {postMessageComponent};