angular.module('base')
	.component('someEl', {
		template: require('../templates/user-pug.component.pug')(),
		restrict: 'E',
		controller: function() {

		}
});

import '../templates/styles.styl';