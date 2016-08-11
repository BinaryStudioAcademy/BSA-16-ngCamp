import './test.styl';

class testCtrl {
    constructor() {
    }
}

const testComponent = {
    controller: testCtrl,
    controllerAs: 'test',
    template: require('./test.pug')(),
    selector: 'test'
};

export {testComponent};