import './checkinsCreateStyles.styl';

class CheckinsCreateComponentController {
    constructor(http) {
        this.http = http;
    }
}

CheckinsCreateComponentController.$inject = ['httpGeneral'];

const checkinsCreateComponent = {
    controller: CheckinsCreateComponentController,
    selector: 'checkinsCreateComponent',
    template: require('./checkinsCreate-pug.component.pug')()
};

export {
    checkinsCreateComponent
};