import './headerStyles.styl';

class HeaderComponentController {
    constructor() {
    }
    
}

HeaderComponentController.$inject = [];

const headerComponent = {
    controller: HeaderComponentController,
    selector: 'headerComponent',
    template: require('./header-pug.component.pug')(),
    controllerAs: 'head'
};

export {
    headerComponent
};