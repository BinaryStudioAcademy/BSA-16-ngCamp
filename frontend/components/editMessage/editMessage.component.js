import './editMessage.styl';

class editMessageController {
    constructor() {
    }
}

const editMessageComponent = {
    controller: editMessageController,
    controllerAs: 'editCtrl',
    template: require('./editMessage.pug')(),
    selector: 'editMessage'
};

export {editMessageComponent};