(function () {
  "use strict";

  angular
    .module("base")
    .service("popupNotifications", popupNotifications);

  popupNotifications.$inject = ["Alertify"];

  function popupNotifications(Alertify) {
    var vm = this;
    vm.notifyAlert = notifyAlert;
    vm.notifyConfirm = notifyConfirm;
    vm.notifySuccess = notifySuccess;
    vm.notifyStandart = notifyStandart;
    vm.notifyError = notifyError;
    vm.notifyPersistent = notifyPersistent;
    vm.notifyNewMsg = notifyNewMsg;

    function notifyAlert(alertMsg) {
      alertMsg = alertMsg || "Hello in Farm Apps";
      Alertify.alert(alertMsg);
    }

    function notifyConfirm(confirmMsg) {
      confirmMsg = confirmMsg || "Are you sure?";
      Alertify.set({buttonReverse: true});
      Alertify.confirm(confirmMsg).then(
        function onOk() {
          Alertify.success("You've clicked Ok");
        },
        function onCancel() {
          Alertify.error("You've clicked Cancel")
        }
      );
    }

    function notifySuccess(successMsg) {
      successMsg = successMsg || "Success log message";
      Alertify.success(successMsg);
    }

    function notifyStandart(standartMsg) {
      standartMsg = standartMsg || "Standard log message";
      Alertify.log(standartMsg);
    }

    function notifyError(errorMsg) {
      errorMsg = errorMsg || "Error log message";
      Alertify.error(errorMsg);
    }

    function notifyPersistent(persistentMsg) {
      persistentMsg = persistentMsg || "Will stay untill clicked";
      alertify.log(persistentMsg, 0);
    }

    function notifyNewMsg(newMsg) {
      newMsg = newMsg || "You have a new message";
      alertify.success(newMsg, 0);
    }

    // Prompt Dialog
    // Alertify.prompt("Your age", 21).then(
    //   function onOk(answer) {
    //   },
    //   function onCancel() {
    //   }
    // );

    // Pops dialog with JSON of the object
    // Alertify.json(object);
  }
})();