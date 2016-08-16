import './readMore.styl';

class readMoreController {
    constructor() {
        let vm = this;
        vm.readmoreFlag = true;
        vm.switchFlag = () => (vm.readmoreFlag = false);
    }
}

const readMoreDirective = {
    template: require('./readMore.pug')(),
    name: 'readMore',
    controller: readMoreController,
    controllerAs: 'readmore',
    transclude: true,
    link: link
};

function link(scope, element, attrs, ctrl, transclude) {
    const length = attrs.length || 10;

    transclude(scope, function (clone, scope) {
        ctrl.text = clone.text();
    });

    ctrl.mainText = ctrl.text.substring(0, length);
    ctrl.additionalText = ctrl.text.substring(length, ctrl.text.length);
}

export {readMoreDirective};