class reportsGUI {
    constructor() {
        this.manageItem = manageItem;
        this.isUserPanel = false;
        this.isTypePanel = true;
        this.manageTypePanel = manageTypePanel;
        this.manageUserPanel = manageUserPanel;
        this._types = ['Message', 'Task', 'Event', 'CheckIn'];
        this.hello = hello;

    }
}

function hello() {
    console.log("obj");
}

function manageItem(index, fromArr, toArr) {
    // console.log(fromArr);
    let item = fromArr[index];
    let indexTo = fromArr.indexOf(item);
    if (item == 'All') {
        fromArr.splice(0, fromArr.length, "All");
        toArr.splice(0, toArr.length, 'Message', 'Task', 'Event', 'CheckIn');
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

export {
    reportsGUI
};
