class popupNotifications {
    constructor() {
        this.alertify = window.alertify;
    }

    reset() {
        this.alertify.set({
            buttonReverse: true,
            labels: {
                ok: "OK",
                cancel: "Cancel"
            }
        });
    }

    notifyAlert(alertMsg) {
        this.reset();
        alertMsg = alertMsg || "Alert Dialog!";
        this.alertify.alert(alertMsg);
    }

    notifyConfirm(confirmMsg, btnOk, btnCancel) {
        confirmMsg = confirmMsg || "Are you sure?";

        this.alertify.set({
            buttonReverse: true,
            labels: {
                ok: btnOk ? btnOk : "Ok",
                cancel: btnCancel ? btnCancel : "Cancel"
            }
        });

        return this.alertify.confirm(confirmMsg);
    }

    notifySuccess(successMsg) {
        successMsg = successMsg || "Success log message";
        this.alertify.success(successMsg);
    }
    notifyStandard(standardMsg) {
        standardMsg = standardMsg || "Standard log message";
        this.alertify.log(standardMsg);
    }
    notifyError(errorMsg) {
        errorMsg = errorMsg || "Error log message";
        this.alertify.error(errorMsg);
    }
    persistentSuccess(successPersist) {
        successPersist = successPersist || "Will stay untill clicked";
        this.alertify.success(successPersist, 0);
    }
    persistentStandard(standardPersist) {
        standardPersist = standardPersist || "Will stay untill clicked";
        this.alertify.log(standardPersist, "", 0);
    }
    persistentError(errorPersist) {
        errorPersist = errorPersist || "Will stay untill clicked";
        this.alertify.error(errorPersist, 0);
    }
}

popupNotifications.$inject = [];

export {
    popupNotifications
};