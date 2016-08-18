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
    	// console.log(document.getElementsByClassName("side-menu").style.display);
    	// console.log(a.style.display);
    	// if (a.style.display == "none" ) {
    	// 	a.style.display = block;
    	// } else {
    	// 	a.style.displaly = none;
    	// }
    	// console.log(a);
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