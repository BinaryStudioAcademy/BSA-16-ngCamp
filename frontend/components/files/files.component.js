import './files.styl';

class filesController {
    constructor(httpGeneral) {
        this.http = httpGeneral;
    }
}

const filesComponent = {
    controller: filesController,
    controllerAs: 'filesCtrl',
    template: require('./files.pug')(),
    selector: 'files'
};

export {filesComponent};
