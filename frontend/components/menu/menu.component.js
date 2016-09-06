import './menuStyles.styl';

class MenuComponentController {
    constructor(http) {
        this.http = http;
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

MenuComponentController.$inject = ["httpGeneral"];

const menuComponent = {
    controller: MenuComponentController,
    controllerAs: 'MenuCtrl',
    selector: 'menuComponent',
    template: require('./menu-pug.component.pug')()
};

export {
    menuComponent
};