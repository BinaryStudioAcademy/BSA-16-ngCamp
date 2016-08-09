import '../../templates/styles/project.component.styl';

class ProjectComponentController {
    constructor(popupNotifications) {
        this.popupNotifications = popupNotifications;
    }
}

ProjectComponentController.$inject = ['popupNotifications'];

const projectComponent = {
    controller: ProjectComponentController,
    selector: 'projectComponent',
    template: require('../../templates/project.component.pug')(),
};


export {
    projectComponent
};