import './checkinsInfoStyles.styl';

class CheckinsInfoComponentController {
    constructor(http) {
        this.http = http;
    }
}

CheckinsInfoComponentController.$inject = ['httpGeneral'];

const checkinsInfoComponent = {
    controller: CheckinsInfoComponentController,
    selector: 'checkinsInfoComponent',
    template: require('./checkinsInfo-pug.component.pug')()
};

export {
    checkinsInfoComponent
};