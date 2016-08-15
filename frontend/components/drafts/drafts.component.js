import "./draftsStyle.styl";

class DraftsComponentController{
    constructor(){
        
    }
};

DraftsComponentController.$inject = [];

const draftsComponent = {
    controller: DraftsComponentController,
    selector: "draftsComponent",
    template: require("./drafts.template.pug")()
};

export {
    draftsComponent
}; 