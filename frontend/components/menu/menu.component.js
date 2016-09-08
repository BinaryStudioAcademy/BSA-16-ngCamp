import './menuStyles.styl';

class MenuComponentController {
    constructor(http,$location) {
        this.http = http;
        this.disabled = false;
        this.location = $location;
    }

    $onInit(){
        let self = this;
        if (self.location.path() === 'noProject'){
            self.disabled = true;
        }
    }
    showMenu(){

    	let x = document.getElementById("side-menu");
    	if (x.className === "side-menu") {
        	x.className += " show";
    	} else {
          	x.className = "side-menu";
    	}
    }
    hideMenu(){
        let x = document.getElementById("side-menu");
        x.className += "hide";
    }
}

MenuComponentController.$inject = ["httpGeneral","$location"];

const menuComponent = {
    controller: MenuComponentController,
    controllerAs: 'MenuCtrl',
    selector: 'menuComponent',
    template: require('./menu-pug.component.pug')()
};

export {
    menuComponent
};