import angular from "angular";

angular
    .module("base")
    .factory("popupNotifications", popupNotifications);

popupNotifications.$inject = ["Alertify"];

function popupNotifications(Alertify) {
    let service = {
        notifyAlert: notifyAlert,
        notifyConfirm: notifyConfirm,
        notifySuccess: notifySuccess,
        notifyStandard: notifyStandard,
        notifyError: notifyError,
        persistentSuccess: persistentSuccess,
        persistentStandard: persistentStandard,
        persistentError: persistentError,
        reset: reset
    };

    function notifyAlert(alertMsg) {
        reset();
        alertMsg = alertMsg || "Alert Dialog!";
        Alertify.alert(alertMsg);
    }

    function reset() {
        Alertify.set({
            buttonReverse: true,
            labels: {
                ok: "OK",
                cancel: "Cancel"
            }
        });
    }

    function notifyConfirm(confirmMsg, btnOk, btnCancel) {
        confirmMsg = confirmMsg || "Are you sure?";

        Alertify.set({
            buttonReverse: true,
            labels: {
                ok: btnOk ? btnOk : "Ok",
                cancel: btnCancel ? btnCancel : "Cancel"
            }
        });

        Alertify.confirm(confirmMsg);
    }

    function notifySuccess(successMsg) {
        successMsg = successMsg || "Success log message";
        Alertify.success(successMsg);
    }

    function notifyStandard(standardMsg) {
        standardMsg = standardMsg || "Standard log message";
        Alertify.log(standardMsg);
    }

    function notifyError(errorMsg) {
        errorMsg = errorMsg || "Error log message";
        Alertify.error(errorMsg);
    }

    function persistentSuccess(successPersist) {
        successPersist = successPersist || "Will stay untill clicked";
        alertify.success(successPersist, 0);
    }

    function persistentStandard(standardPersist) {
        standardPersist = standardPersist || "Will stay untill clicked";
        alertify.log(standardPersist, "", 0);
    }

    function persistentError(errorPersist) {
        errorPersist = errorPersist || "Will stay untill clicked";
        alertify.error(errorPersist, 0);
    }

    return service;
}