import "./commentsStyle.styl";

class CommentsComponentController{
    constructor(){
        
    }
};

CommentsComponentController.$inject = [];

const commentsComponent = {
    controller: CommentsComponentController,
    selector: "commentsComponent",
    template: require("./comments.template.pug")()
};

export {
    commentsComponent
}; 