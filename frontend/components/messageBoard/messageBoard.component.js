import './messageBoard.styl';

class messageBoardController {
    constructor() {
    }
}

const messageBoardComponent = {
    controller: messageBoardController,
    controllerAs: 'msgBoard',
    template: require('./messageBoard.pug')(),
    selector: 'messageBoard'
};

export {messageBoardComponent};