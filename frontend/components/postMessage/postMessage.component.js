import './postMessage.styl';

class postMessageController {
    constructor() {
    }
}

const postMessageComponent = {
    controller: postMessageController,
    controllerAs: 'postCtrl',
    template: require('./postMessage.pug')(),
    selector: 'postMessage'
};

export {postMessageComponent};