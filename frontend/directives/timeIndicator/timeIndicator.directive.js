import './timeIndicator.styl';

class timeIndicatorController {
    constructor($interval, $attrs) {
        let vm = this;
        vm.alert = () => alert('test');

        //function moveIndicator(element, rowHeight) {
        //    let newPos = vm.calcPosition(rowHeight);
        //    element.css('top', newPos);
        //}
        //
        //function calcPosition(rowHeight) {
        //
        //    if (!rowHeight) {
        //        rowHeight = $scope.calcRowHeight($scope.tableSel);
        //    }
        //
        //    var today = new Date();
        //    var currentHour = today.getHours();
        //    var currentMinutes = today.getMinutes();
        //    var oneMinHeight = rowHeight / 60;
        //    var newPosY = currentHour * rowHeight + (oneMinHeight * currentMinutes) + 'px';
        //    console.log(newPosY);
        //    return newPosY;
        //}
        //
        //function changePosition(element, rowHeight) {
        //    $interval(function () {
        //        vm.moveIndicator(element, rowHeight);
        //    }, 60000);
        //}
    }
}

timeIndicatorController.$inject = ['$interval', '$attrs'];

const timeIndicatorDirective = {
    template: require('./timeIndicator.pug')(),
    name: 'timeIndicator',
    controller: timeIndicatorController,
    controllerAs: 'timeCtrl',
    transclude: true,
    scope: true,
    link: timeIndicatorDirectiveLink
};

function timeIndicatorDirectiveLink(scope, element, attrs, ctrl) {
    ctrl.calcRowHeight(ctrl.tableId);
}

export {timeIndicatorDirective};