import angular from 'angular';
import ngComponentRouter from 'ngcomponentrouter';
import accordion from 'angular-ui-bootstrap/src/accordion';
import datepickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';

const app = angular.module('base', ['ngComponentRouter', accordion, datepickerPopup]);

app.value('$routerRootComponent', 'rootElement');

export {app};