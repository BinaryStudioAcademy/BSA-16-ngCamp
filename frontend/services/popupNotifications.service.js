(function () {
  "use strict";

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
      persistentError: persistentError
    };

    return service;

    function notifyAlert(alertMsg) {
      alertMsg = alertMsg || "Alert Dialog!";
      Alertify.alert(alertMsg);
    }

    function notifyConfirm(confirmMsg) {
      confirmMsg = confirmMsg || "Are you sure?";

      Alertify.set({
        buttonReverse: true,
        labels: {
          ok: "Accept",
          cancel: "Deny"
        }
      });

      Alertify.confirm(confirmMsg)
        .then(function () {
          return notifySuccess("You've clicked OK");
        })
        .catch(function () {
          return notifyError("You've clicked Cancel");
        });
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

    // Prompt Dialog
    // Alertify.prompt("Your age", 21).then(
    //   function onOk(answer) {},
    //   function onCancel() {}
    // );

    // Pops dialog with JSON of the object
    // Alertify.json(object);
  }
})();