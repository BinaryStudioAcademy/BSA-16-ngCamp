import './timeIndicator.styl';

class timeIndicatorController {
    constructor() {
    }
}

timeIndicatorController.$inject = [];

const timeIndicatorDirective = {
    template: require('./timeIndicator.pug')(),
    name: 'timeIndicator',
    controller: timeIndicatorController,
    controllerAs: 'timeCtrl',
    transclude: true,
    scope: true
};

export {timeIndicatorDirective};