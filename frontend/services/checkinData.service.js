class checkinData {
    constructor(httpGeneral, $rootscope) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.rootScp = $rootscope;
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

    oneDateToDisplay(day){
        // console.log(day);
        let vm = this;
        vm.years = [];
        vm.checkins = [];
        vm.getCheckins(day);
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
                    days: days
                };
        
            } else  {
                if(vm.years[day.year].months[day.month].days){
                    vm.years[day.year].months[day.month].days[day.date] = {
                        day: day,
                        checkins: vm.checkins
                    };
                } else {
                    // not shure if it is needed
                    vm.years[day.year].months[day.month].days = [];
                    vm.years[day.year].months[day.month].days[day.date] = {
                        day: day,
                        checkins: vm.checkins
                    };
                }

            }

        }
    }
    removeDate(day) {
        let vm = this;
        vm.years[day.year].months[day.month].days[day.date] = undefined;
    }

    findLeftMostDate() {
        let vm = this;
        let leftMost = null;
        loop1: for (let i = 0; i < vm.years.length; i++) {
                if (vm.years[i]) {
                    // console.log('before');
                    loop2: for (let j = 0; j < vm.years[i].months.length; j++) {
                        // console.log(j);
                        if (vm.years[i].months[j]) {
                            if (vm.years[i].months[j].days) {
                                loop3: for (let k = 0; k < vm.years[i].months[j].days.length; k++) {
                                    if (vm.years[i].months[j].days[k]) {
                                        leftMost = {
                                            year: i,
                                            month: j,
                                            date: k
                                        };
                                        // break loop2;
                                        return leftMost;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        // return leftMost;
    }

    findRightMostDate() {
        let vm = this;
        let rightMost = null;
        loop1:
            for (let i = vm.years.length; i >= 0; i--) {
                if (vm.years[i]) {
                    loop2: for (let j = vm.years[i].months.length; j >= 0; j--) {
                        if (vm.years[i].months[j]) {
                            if (vm.years[i].months[j].days) {
                                loop3: for (let k = vm.years[i].months[j].days.length; k >= 0; k--) {
                                    if (vm.years[i].months[j].days[k]) {
                                        rightMost = {
                                            year: i,
                                            month: j,
                                            date: k
                                        };
                                        break loop2;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        return rightMost;
    }

    previousDay() {
        let vm = this;
        let leftMost = vm.findLeftMostDate();
        console.log('leftmost');
        console.log(leftMost);
        if (leftMost.date > 1) {
            vm.checkins = [];
            let date = {
                year: leftMost.year,
                month: leftMost.month,
                date: leftMost.date - 1
            };
            vm.addDateToDisplay(date);

            vm.rootScp.$broadcast('addDate', date);
            return vm.getCheckins(date).then(function(data) {
                return data;
            });
        } else {
            if (leftMost.month>0) {
                vm.checkins = [];
                let date = {
                    year: leftMost.year,
                    month: --leftMost.month,
                    date: new Date(leftMost.year, leftMost.month + 1, 0).getDate()
                };
                // console.log(date);
                vm.addDateToDisplay(date);
                // console.log(vm.years);
                vm.rootScp.$broadcast('addDate', date);
                return vm.getCheckins(date).then(function(data) {
                    return data;
                });                
            } else {
                vm.checkins = [];
                let tempdate = new Date(leftMost.year, leftMost.month, leftMost.date - 1);
                // let date = {
                //     year: --leftMost.year,
                //     month: 11,
                //     date: new Date(--leftMost.year, 11, 30)
                // };
                let date = {
                    year: tempdate.getFullYear(),
                    month: tempdate.getMonth(),
                    date: tempdate.getDate()
                };
                console.log(date);
                vm.addDateToDisplay(date);
                console.log(vm.years);
                vm.rootScp.$broadcast('addDate', date);
                return vm.getCheckins(date).then(function(data) {
                    return data;
                });        
            }

        }
    }
}

checkinData.$inject = ['httpGeneral', '$rootScope'];



export {
    checkinData
};