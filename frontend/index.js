import angular from 'angular';
import ngComponentRouter from 'ngcomponentrouter';
const app = angular.module('base', ['ngComponentRouter']);

app.value('$routerRootComponent', 'rootElement');

export {app};