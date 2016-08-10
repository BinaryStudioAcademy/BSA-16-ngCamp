import './headerStyles.styl';

class HeaderComponentController {
    constructor(http) {
        this.http = http;
    }
}

HeaderComponentController.$inject = ['httpGeneral'];

const headerComponent = {
    controller: HeaderComponentController,
    selector: 'headerComponent',
    template: require('./header-pug.component.pug')()
};

export {
    headerComponent
};