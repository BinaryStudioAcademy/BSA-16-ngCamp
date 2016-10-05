class mainPageCheckinData {
    constructor(httpGeneral, $rootscope) {
        let vm = this;
        vm.httpGeneral = httpGeneral;
        vm.rootScp = $rootscope;
        vm.years = [];
    }

    getCheckins(day) {
        let vm = this;
        return vm.httpGeneral.sendRequest({
            type: "GET",
            url: 'api/checkins/' + window._injectedData.currentProject + '/bydate/' + day.year + '/' + day.month + '/' + day.date
        }).then(function(res) {
            if (res) {
                return res;
             }
        });
    }

    oneDateToDisplay(day) {
        let vm = this;
        vm.years = [];
        vm.getCheckins(day).then(function(res) {
            let months = [];
            let days = [];
            days[day.date] = {
                day: day,
                checkins: res
            };
            months[day.month] = {
                days: days
            };
            vm.years[0] = {
                year: day.year,
                months: months
            };
        });
    }

    addDateToDisplay(day) {
        let vm = this;
        return vm.getCheckins(day).then(function(res) {
            let yearIndex = undefined;
            if(vm.years.length > 0) {
                vm.years.forEach(function(year) {
                    if (year.year === day.year) {
                        yearIndex = vm.years.indexOf(year);
                     }
                });
            }
            if (yearIndex === undefined ) {
                let months = [];
                let days = [];
                days[day.date] = {
                    day: day,
                    checkins: res
                };
                months[day.month] = {
                    days: days
                };
                vm.years.push({
                    year: day.year,
                    months: months
                });
                vm.years.sort(function(a, b) {
                    return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);
                });
                vm.rootScp.$broadcast('addDate', day);
            } else {
                if (!vm.years[yearIndex].months[day.month]) {
                    let days = [];
                    days[day.date] = {
                        day: day,
                        checkins: res
                    };
                    vm.years[yearIndex].months[day.month] = {
                        days: days
                    };
                    vm.rootScp.$broadcast('addDate', day);
                } else  {
                    if(vm.years[yearIndex].months[day.month].days) {
                        vm.years[yearIndex].months[day.month].days[day.date] = {
                            day: day,
                            checkins: res
                        };
                        vm.rootScp.$broadcast('addDate', day);
                    } else {
                        vm.years[yearIndex].months[day.month].days = [];
                        vm.years[yearIndex].months[day.month].days[day.date] = {
                            day: day,
                            checkins: res
                        };
                        vm.rootScp.$broadcast('addDate', day);
                    }
                }
            }
        });
    }

    removeDate(day) {
        let vm = this;
        if(vm.years.length>0) {
            vm.years.forEach(function(year) {
                if (year.year == day.year) {
                   year.months[day.month].days[day.date] = undefined;
                }
            });
        }
    }

    shiftKeyEventHandler(day) {
        let vm = this;
        let leftMost = vm.findLeftMostDate();
        let leftMostDate = new Date(leftMost.year, leftMost.month, leftMost.date);
        let dayDate = new Date(day.year, day.month, day.date);
        let pointerDate = leftMostDate;
        if (dayDate < leftMostDate) {
            while (pointerDate.getTime() !== dayDate.getTime()) {
                pointerDate = new Date(pointerDate.getFullYear(), pointerDate.getMonth(), pointerDate.getDate() - 1);
                let date = {
                    year: pointerDate.getFullYear(),
                    month: pointerDate.getMonth(),
                    date: pointerDate.getDate()
                };
                vm.addDateToDisplay(date);                
            }
        } else if (dayDate > leftMostDate) {
            while (pointerDate.getTime() !== dayDate.getTime()) {
                pointerDate = new Date(pointerDate.getFullYear(), pointerDate.getMonth(), pointerDate.getDate() + 1);
                let date = {
                    year: pointerDate.getFullYear(),
                    month: pointerDate.getMonth(),
                    date: pointerDate.getDate()
                };
                vm.addDateToDisplay(date);
            }
        }
    }

    findLeftMostDate() {
        let vm = this;
        let leftMost = null;
        for (let i = 0; i < vm.years.length; i++) {
            if (vm.years[i]) {
                for (let j = 0; j < vm.years[i].months.length; j++) {
                    if (vm.years[i].months[j]) {
                        if (vm.years[i].months[j].days) {
                            for (let k = 0; k < vm.years[i].months[j].days.length; k++) {
                                if (vm.years[i].months[j].days[k]) {
                                    leftMost = {
                                        year: vm.years[i].year,
                                        month: j,
                                        date: k
                                    };
                                    return leftMost;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    findRightMostDate() {
        let vm = this;
        let rightMost = null;
        for (let i = vm.years.length; i >= 0; i--) {
            if (vm.years[i]) {
                for (let j = vm.years[i].months.length; j >= 0; j--) {
                    if (vm.years[i].months[j]) {
                        if (vm.years[i].months[j].days) {
                            for (let k = vm.years[i].months[j].days.length; k >= 0; k--) {
                                if (vm.years[i].months[j].days[k]) {
                                    rightMost = {
                                        year: vm.years[i].year,
                                        month: j,
                                        date: k
                                    };
                                    return rightMost;
                                }
                            }
                        }
                    }
                }
             }
        }
    }

    previousDay() {
        let vm = this;
        let leftMost = vm.findLeftMostDate();
        let dateObj = new Date(leftMost.year, leftMost.month, leftMost.date - 1);
        let date = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth(),
            date: dateObj.getDate()
        };
        return vm.getCheckins(date).then(function(data) {
            vm.addDateToDisplay(date);
         });
    }
}

mainPageCheckinData.$inject = ['httpGeneral', '$rootScope'];

export {
    mainPageCheckinData
};