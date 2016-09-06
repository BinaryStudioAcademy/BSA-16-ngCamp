//import './checkinsStyles.styl';

class PanelComponentController {
    constructor(httpGeneral) {
        this.httpGeneral = httpGeneral;
    }
}

PanelComponentController.$inject = [
    'httpGeneral'
];
const rightPanelComponent = {
    controller: PanelComponentController,
    selector: 'rightPanelComponent',
    controllerAs: 'panel',
    template: require('./panel-pug.component.pug')(),
    $routeConfig: [{
        path:'/',
        name:'Checkins List',
        component:'checkinsListComponent',
        useAsDefault: true
    }]
};

export {
    rightPanelComponent
};