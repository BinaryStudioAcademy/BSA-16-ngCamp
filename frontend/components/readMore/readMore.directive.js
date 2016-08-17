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
    scope: {
        mainText: '=',
        additionalText: '='
    },
    link: link
};

function link(scope, element, attrs, ctrl, transclude) {
    const length = attrs.length || 300;

    transclude(scope, function (clone, scope) {
        ctrl.text = clone.text();
    });

    if (ctrl.text.length > length) {
        ctrl.mainText = ctrl.text.substring(0, length);
        ctrl.additionalText = ctrl.text.substring(length, ctrl.text.length);
    }
    else {
        ctrl.mainText = ctrl.text;
        ctrl.readmoreFlag = false;
    }
}

export {readMoreDirective};