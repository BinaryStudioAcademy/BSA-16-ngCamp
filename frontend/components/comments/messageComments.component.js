import "./commentsStyle.styl";



class messageCommentsComponentController{
    constructor(httpGeneral){
        this.httpGeneral = httpGeneral;
        this.comments = [];
    }
    $routerOnActivate(next){
    	let self = this;
    	self.httpGeneral.sendRequest({
    		type:"GET",
    		url:`api/messages/${next.params.id}/comments`,
    	}).then(function(res){
    		self.comments = res.comments;
    	});
    }
};

messageCommentsComponentController.$inject = ['httpGeneral'];

const messageCommentsComponent = {
    controller: messageCommentsComponentController,
    selector: "messageCommentsComponent",
    template: require("./messageComments.template.pug")(),
};

export {
    messageCommentsComponent
}; 