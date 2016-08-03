(function(){

	'use strict';

	angular
		.module('base')
		.service('httpGeneral',httpGeneral);

	httpGeneral.$inject = [
		'$http',
	]

	function httpGeneral($http){
		this.httpSend = function(object){
			if (typeof object.url !== 'string' || object.url === undefined || object.url.length === 0){
				console.log("HTTP REQUEST EROR: REQUEST ULR IS ABSENT");
				return;
			}
			if (typeof object.url !== 'string' || object.type === undefined || object.type.length === 0){
				console.log("HTTP REQUEST EROR: REQUEST TYPE IS ABSENT");
				return;
			}
			switch (object.type.toLowerCase()){
				case 'get':
					$http.get(object.url).then(succesfullRequest,failedRequest);
					break;
				case 'post':
					$http.post(object.url,object.body).then(succesfullRequest,failedRequest);
					break;
				case 'put':
					$http.put(object.url,object.body).then(succesfullRequest,failedRequest);
					break;
				case 'delete':
					$http.delete(object.url).then(succesfullRequest,failedRequest);
					break;
				}
			function succesfullRequest(res){
				console.log("Succesfull Request");
				alert(object.successMessageToUser);
			}	
			function failedRequest(error){
				if (object.errorMessageToDev) {
        			if (error.data && typeof error.data && error.data.message)
            			console.log(object.errorMessageToDev + ' ' + error.data.message);
        			else 
        				console.log(object.errorMessageToDev + ' ' + error.data);
    			}
				if (object.errorMessageToUser){
					if (error.status === 404 && (typeof error.data==="string" && error.data.indexOf('Cannot GET /api/')===-1)){
						if (object.notFoundMessage)
							console.log(object.notFoundMessage);
						else alert(object.errorMessageToUser);
					} else alert(object.errorMessageToUser);
				}
			}
		}
	}
})();