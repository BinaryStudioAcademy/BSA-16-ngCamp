import angular from 'angular';
import ngComponentRouter from 'ngcomponentrouter';
import accordion from 'angular-ui-bootstrap/src/accordion';
import datepickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';
import datepicker from 'angular-ui-bootstrap/src/datepicker';

const app = angular.module('base', ['ngComponentRouter', accordion, datepickerPopup, datepicker]);

app.value('$routerRootComponent', 'rootElement');

export {app};