import angular from 'angular';
const app = angular.module('base', ['ngComponentRouter']);

app.value('$routerRootComponent', 'rootElement');

export {app};