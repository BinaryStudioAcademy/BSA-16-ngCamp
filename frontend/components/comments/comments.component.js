import "./commentsStyle.styl";



class CommentsComponentController{
    constructor(){
        
    }
};

CommentsComponentController.$inject = [];

const commentsComponent = {
    controller: CommentsComponentController,
    selector: "commentsComponent",
    template: require("./comments.template.pug")(),
    $routeConfig: [{
 		path:'/:id/message',
 		name:'Message comments',
 		component:'messageComments',
	}]
};

export {
    commentsComponent
}; 