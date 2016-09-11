class reportsGUI {
    constructor() {
        this.manageItem = manageItem;
        this.isUserPanel = false;
        this.isTypePanel = true;
        this.manageTypePanel = manageTypePanel;
        this.manageUserPanel = manageUserPanel;
        this.arrayToString = arrayToString;
        this._types = ['Message', 'Task', 'Event', 'CheckIn'];
    }
}


function manageItem(index, fromArr, toArr, def) {
    let item = fromArr[index];
    let indexTo = fromArr.indexOf(item);
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

export {
    reportsGUI
};