import angular from 'angular';
import ngComponentRouter from 'ngcomponentrouter';
import accordion from 'angular-ui-bootstrap/src/accordion';
import datepickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';
import ngAnimate from 'angular-animate';
import datepicker from 'angular-ui-bootstrap/src/datepicker';
import timepicker from 'angular-ui-bootstrap/src/timepicker';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import angularJwt from 'angular-jwt';


const app = angular.module('base', ['ngComponentRouter', accordion, datepickerPopup, datepicker, timepicker, ngAnimate, ngSanitize, 'ui.tinymce', ngCookies, angularJwt]);

app.run(function($cookies, $rootScope, jwtHelper, httpGeneral) {
	let token = $cookies.get('x-access-token');
	if (token && !window._injectedData.avatar) {
		let decodedToken = jwtHelper.decodeToken(token);
		httpGeneral.sendRequest({
			type: "GET",
			url: window.location.protocol + '//' + window.location.host + '/profile/user/getByCentralId/' + decodedToken.id
		}).then(function(res) {
			if (res[0] && res[0].avatar) {
				window._injectedData.avatar = {
					real: res[0].avatar.urlAva ? res[0].avatar.urlAva : '',
					small: res[0].avatar.thumbnailUrlAva ? res[0].avatar.thumbnailUrlAva : ''
				};
				console.log($rootScope.avatar);
			}
		});
	}
});



app.value('$routerRootComponent', 'rootElement');
export {
	app
};