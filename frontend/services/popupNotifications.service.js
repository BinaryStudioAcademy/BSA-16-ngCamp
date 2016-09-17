class popupNotifications {
    constructor() {
        this.alertify = window.alertify;
    }

    // Dialogs
    notifyAlert(alertTitle, alertMsg) {
        alertTitle = alertTitle || "Alert Title!";
        alertMsg = alertMsg || "Alert Message!";

        this.alertify.alert(alertTitle, alertMsg);
    }

    notifyConfirm(confirmTitle, confirmMsg, btnOk, btnCancel, onOkFunc) {
        confirmTitle = confirmTitle || "Confirm Title";
        confirmMsg = confirmMsg || "Confirm Message";

        this.alertify.confirm(confirmMsg)
            .setHeader(confirmTitle)
            .set('onok', onOkFunc)
            .set({
                labels: {
                    ok: btnOk ? btnOk : "Ok",
                    cancel: btnCancel ? btnCancel : "Cancel"
                }
            });
    }



    notifyPrompt(promptTitle, promptMsg, promptValue) {
        promptTitle = promptTitle || "Prompt Title";
        promptMsg = promptMsg || "Prompt Message";
        promptValue = promptValue || "Prompt Value";

        this.alertify.prompt(promptMsg, promptValue)
            .setHeader(promptTitle);
    }

    // Notifications
    notifySuccess(successMsg) {
        successMsg = successMsg || "Success message";
        this.alertify.success(successMsg);
    }

    notifyStandard(standardMsg) {
        standardMsg = standardMsg || "Standard message";
        this.alertify.message(standardMsg);
    }

    notifyError(errorMsg) {
        errorMsg = errorMsg || "Error message";
        this.alertify.error(errorMsg);
    }

    notifyWarning(warningMsg) {
        warningMsg = warningMsg || "Warning message";
        this.alertify.warning(warningMsg);
    }

    //Persistent Notifications
    persistentSuccess(successPersist) {
        successPersist = successPersist || "Will stay untill clicked";
        this.alertify.success(successPersist, 0);
    }

    persistentStandard(standardPersist) {
        standardPersist = standardPersist || "Will stay untill clicked";
        this.alertify.message(standardPersist, 0);
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