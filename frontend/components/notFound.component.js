angular.module('base')
	.component('notfound', {
		template: require('../templates/404-pug.component.pug')(),
		restrict: 'E',
		controller: function() {
			console.log('404 COMPONENT LOADED');
		}
});