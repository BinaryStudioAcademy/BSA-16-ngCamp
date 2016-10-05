class RightPanelComponentController {
    constructor(httpGeneral, $scope, $rootScope, mainPageCheckinData) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.date = new Date();
        vm.leftMostDate = new Date();
        vm.rigthMostDate = new Date();
        vm.scp = $scope;
        vm.rootScp = $rootScope;
        vm.checkinData = mainPageCheckinData;
        vm.years = {
            get list() {
                return vm.checkinData.years;
            } 
        };
        vm.changeProjectHover = false;
    }

    $onInit() {
        let vm = this;
        if (!vm.years.list.length) {
            let dateObj = {
                year: vm.date.getFullYear(),
                month: vm.date.getMonth(),
                date: vm.date.getDate()
            };
            vm.checkinData.addDateToDisplay(dateObj);
        }

        vm.scp.$on('date', function(event, day) {
            vm.checkinData.oneDateToDisplay(day);
        });

        vm.scp.$on('mouseOut', function(event) {
            vm.changeProjectHover = false;
        });

        vm.scp.$on('mouseIn', function(event) {
            vm.changeProjectHover = true;
        });

        vm.scp.$on('shiftdate', function(event, day) {
            vm.checkinData.shiftKeyEventHandler(day);
        });

        vm.scp.$on('ctrlDate', function(event, day) {
            vm.checkinData.addDateToDisplay(day);
            vm.rootScp.$broadcast('addDate', day);
        });

        vm.scp.$on('removeDate', function(event, day) {
            vm.checkinData.removeDate(day);
        });

        angular.element(document.querySelectorAll('right-panel-component.ng-isolate-scope')).bind("scroll", function() {
            vm.scrollHandler();
        });

        angular.element(document).bind("mousewheel", function(e) {
            vm.mouseWheelHandler(e);
        });
    }

    scrollHandler() {
        let vm = this;
        let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
        let scrollTop = document.getElementsByTagName('right-panel-component')[0].scrollTop;
        let offsetHeight = document.getElementsByTagName('right-panel-component')[0].offsetHeight;
        if (((scrollHeight - scrollTop - offsetHeight) / scrollHeight * 100) < 15 && scrollHeight > 80) {
            vm.checkinData.previousDay();
        }
    }

    mouseWheelHandler(e) {
        let vm = this;
        let scrollHeight = document.getElementsByTagName('right-panel-component')[0].scrollHeight;
        let clientHeight = document.getElementsByTagName('right-panel-component')[0].clientHeight;
        if (e.wheelDelta < 0) {
            if (scrollHeight == clientHeight) {
                 if (vm.changeProjectHover == false) {
                    vm.checkinData.previousDay();
                }
            }
        }
    }

    $onDestroy() {
        let vm = this;
        angular.element(document.querySelectorAll('right-panel-component.ng-isolate-scope')).unbind("scroll");
        angular.element(document).unbind("mousewheel");
    }
}

RightPanelComponentController.$inject = ['httpGeneral', '$scope', '$rootScope', 'mainPageCheckinData'];

const rightPanelComponent = {
    controller: RightPanelComponentController,
    selector: 'rightPanelComponent',
    controllerAs: 'rpanel',
    template: require('./panel-pug.component.pug')(),
    $routeConfig: [{
        path: '/',
        name: 'Checkins List',
        component: 'checkinsListComponent',
        useAsDefault: true
    }]
};

export {
    rightPanelComponent
};