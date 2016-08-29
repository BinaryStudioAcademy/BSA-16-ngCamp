import "./draftsStyle.styl";

class DraftsComponentController{
    constructor(httpGeneral,$location,$window){
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.window = $window;
        this.drafts;
    }
    $onInit(){
    	let self = this;
    	self.httpGeneral.sendRequest({
    		type:"GET",
    		url:`api/messages/${window._injectedData.userId}/drafts`
    	}).then(function(res){
    		self.drafts = res;
    	});
    }
};

DraftsComponentController.$inject = ['httpGeneral','$location','$window'];

const draftsComponent = {
    controller: DraftsComponentController,
    selector: "draftsComponent",
    template: require("./drafts.template.pug")()
};

export {
    draftsComponent
}; 