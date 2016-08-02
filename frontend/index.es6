import angular from 'angular';

var app = angular.module('base', []);

app.component('someEl', {
	template: require('./user/user-pug.component.pug')(),
	restrict: 'E',
	controller: function() {
		console.log('COMPONENT LOADED');
	}
});

require('./user/styles.styl');