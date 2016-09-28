class checkinData {
    constructor(httpGeneral) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.checkins = [];
        vm.years = [];

    }

    getCheckins(day) {
        let vm = this;
        return vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/' + window._injectedData.currentProject + '/bydate/' + day.year + '/' + day.month + '/' + day.date
        }).then(function(res) {
            if (res) {
                res.forEach(function(check) {
                    vm.checkins.push(check);
                });
                return res;
            }
        });
    }

    addDateToDisplay(day) {
        let vm = this;
        vm.checkins = [];
        vm.getCheckins(day);
        if (!vm.years[day.year]) {
            let months = [];
            let days = [];

            days[day.date] = {
                day: day,
                checkins: vm.checkins
            };
            months[day.month] = {
                days: days
            };
            vm.years[day.year] = {
                year: day.year,
                months: months
            };

        } else {
            if (!vm.years[day.year].months[day.month]) {
                let days = [];
                days[day.date] = {
                    day: day,
                    checkins: vm.checkins
                };
                vm.years[day.year].months[day.month] = {
                    day: day,
                    checkins: vm.checkins
                };
            } else if (vm.years[day.year].months[day.month]) {
                vm.years[day.year].months[day.month].days[day.date] = vm.checkins;
            } else {
                // vm.years[day.year].months[day.month].days = [];
                // vm.years[day.year].months[day.month].days[day.date] = vm.checkins;
            }

        }
    }
}

checkinData.$inject = ['httpGeneral'];



export {
    checkinData
};