import "./draftsStyle.styl";

class DraftsComponentController{
    constructor(httpGeneral,$location,$window,$rootRouter){
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.window = $window;
        this.drafts;
        this.rootRouter = $rootRouter;
    }
    $onInit(){
    	let self = this;
    	self.httpGeneral.sendRequest({
    		type:"GET",
    		url:`api/messages/${window._injectedData.userId}/drafts`
    	}).then(function(res){
    		self.drafts = res;
    	});
        if (window._injectedData.currentProject === undefined) {
            self.rootRouter.navigateByUrl('/noProject');
        }
    }
};

DraftsComponentController.$inject = ['httpGeneral','$location','$window','$rootRouter'];

const draftsComponent = {
    controller: DraftsComponentController,
    selector: "draftsComponent",
    template: require("./drafts.template.pug")()
};

export {
    draftsComponent
}; 