import angular from 'angular';
import ngComponentRouter from 'ngcomponentrouter';
import accordion from 'angular-ui-bootstrap/src/accordion';
import datepickerPopup from 'angular-ui-bootstrap/src/datepickerPopup';
import ngAnimate from 'angular-animate';
import datepicker from 'angular-ui-bootstrap/src/datepicker';
import ngSanitize from 'angular-sanitize';
import ngCookies from 'angular-cookies';
import angularJwt from 'angular-jwt';


const app = angular.module('base', ['ngComponentRouter', accordion, datepickerPopup, datepicker, ngAnimate, ngSanitize, 'ui.tinymce', ngCookies, angularJwt]);

app.run(function($cookies, $rootScope, jwtHelper, httpGeneral) {
	let token = $cookies.get('x-access-token');
	if (token) {
		let decodedToken = jwtHelper.decodeToken(token);
		httpGeneral.sendRequest({
			type: "GET",
			url: window.protocol + '//' + window.location.host + '/profile/user/getByCentralId/' + decodedToken.id
		}).then(function(res) {
			console.log('GET USER DATA', res);
			if (res && res.avatar) {
				$rootScope.avatar = {
					real: res.avatar.urlAva ? res.avatar.urlAva : '',
					small: res.avatar.thumbnailUrlAva ? res.avatar.thumbnailUrlAva : ''
				};
			}
		});
	}
});



app.value('$routerRootComponent', 'rootElement');
export {
	app
};