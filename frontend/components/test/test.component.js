import './test.styl';

class testCtrl {
    constructor() {
        let vm = this;
        vm.alert = () => alert('test');

        vm.currentDate = new Date();
        vm.isChangeDate = false;
        vm.startChangeDate = () => vm.isChangeDate = true;
        vm.endChangeDate = () => vm.isChangeDate = false;
        vm.changeDateOfStep = (step) => {
            let date = new Date(vm.currentDate);
            date.setDate(date.getDate() + step);
            vm.currentDate = date;
        };
    }
}

const testComponent = {
    controller: testCtrl,
    controllerAs: 'ts',
    bindings: {
        //isChangeDate: '<'
    },
    template: require('./test.pug')(),
    selector: 'test'
};

export {testComponent};