class reportsGUI {
    constructor(httpGeneral) {
        this.http = httpGeneral;
        this.manageItem = manageItem;
        this.isUserPanel = false;
        this.isCheckinPanel = false;
        this.isTypePanel = true;
        this.manageTypePanel = manageTypePanel;
        this.manageCheckinPanel = manageCheckinPanel;
        this.manageUserPanel = manageUserPanel;
        this.arrayToString = arrayToString;
        this._types = ['Message', 'Task', 'Event', 'CheckIn'];
    }
}


function manageItem(index, fromArr, toArr, def, checkin, isAdding) {
    let item = fromArr[index];
    let indexTo = fromArr.indexOf(item);
    console.log(this.http);
    if (item == 'All') {
        if (def == 'user') {
            Array.prototype.splice.apply(toArr, [toArr.length, 0].concat(fromArr));
            fromArr.splice(0, fromArr.length, "All");
            toArr.splice(toArr.indexOf("All"), 1);

        }
        if (def == 'type') {
            fromArr.splice(0, fromArr.length, "All");
            toArr.splice(0, toArr.length, 'Message', 'Task', 'Event', 'CheckIn');
        }
    } else {
        fromArr.splice(indexTo, 1);
        toArr.push(item);
        if (def == "type") {
            if (item == "CheckIn") {
                if (checkin) {
                    if (isAdding) {
                        checkin.isCheckinPick = true;
                        if (!checkin.isLoaded) {
                            this.http.sendRequest({
                                type: "GET",
                                url: "api/checkins/" + vm.projectId + "/users"
                            }).then(function(res) {}
                            }
                        } else {
                            checkin.isCheckinPick = false;
                        }
                    }
                }
            }
        }
    }

    function manageCheckinPanel() {
        if (this.isCheckinPanel)
            this.isCheckinPanel = false;
        else {
            this.isCheckinPanel = true;
        }
    }

    function manageUserPanel() {
        if (this.isUserPanel)
            this.isUserPanel = false;
        else {
            this.isUserPanel = true;
        }
    }

    function manageTypePanel() {
        if (this.isTypePanel)
            this.isTypePanel = false;
        else {
            this.isTypePanel = true;
        }
    }

    function arrayToString(arr) {
        let result = "";
        for (let i = 0; i < arr.length; i++) {
            result += ((arr[i].firstName ? arr[i].firstName : " ") + (arr[i].lastName ? arr[i].lastName : " "));
            if (i != arr.length - 1) result += ", ";
        }
        return result;
    }

    reportsGUI.$inject = ["httpGeneral"];

    export {
        reportsGUI
    };