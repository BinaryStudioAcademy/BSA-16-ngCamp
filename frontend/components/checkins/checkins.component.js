import './checkinsStyles.styl';

class CheckinsComponentController {
    constructor(http) {
        this.http = http;
    }
}

CheckinsComponentController.$inject = ['httpGeneral'];

const checkinsComponent = {
    controller: CheckinsComponentController,
    selector: 'checkinsComponent',
    template: require('./checkins-pug.component.pug')()
};

export {
    checkinsComponent
};