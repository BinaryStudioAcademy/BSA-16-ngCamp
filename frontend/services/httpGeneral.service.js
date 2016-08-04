(function(){

	'use strict';

	angular
		.module('base')
		.service('httpGeneral',httpGeneral);

	httpGeneral.$inject = [
		'$http',
	]
	/*
		object = {
			type: request type,
			url: request url,
			body: data which will be send in request,
			errorMessageToUser: message will be shown to user when error occured,
			errorMessageToDev: console log for debug,
			notFoundMessage:message that will be display when Not Found,
			errorCallback: callback if error occured,
		}
	*/
	function httpGeneral($http){
		this.httpSend = function(object){
			if (typeof object.url !== 'string' || object.url === undefined || object.url.length === 0){
				throw "HTTP REQUEST EROR: REQUEST ULR IS ABSENT";
				return;
			}
			if (typeof object.type !== 'string' || object.type === undefined || object.type.length === 0){
				throw "HTTP REQUEST EROR: REQUEST TYPE IS ABSENT";
				return;
			}
			switch (object.type.toLowerCase()){
				case 'get':
					return $http.get(object.url).then(succesfullRequest,failedRequest);
					break;
				case 'post':
					return $http.post(object.url,object.body).then(succesfullRequest,failedRequest);
					break;
				case 'put':
					return $http.put(object.url,object.body).then(succesfullRequest,failedRequest);
					break;
				case 'delete':
					return $http.delete(object.url).then(succesfullRequest,failedRequest);
					break;
			}
			function succesfullRequest(res){
				//console.log("Succesfull Request");
				//alert(object.successMessageToUser);
				return res.data;
			}	
			function failedRequest(error){
				if (error.status === 403){
					handleForbidden();
					return null;
				}
				if (object.errorMessageToDev) {
        			if (error.data && typeof error.data && error.data.message){
        				console.log(object.errorMessageToDev + ' ' + error.data.message);
        			}
        			else console.log(object.errorMessageToDev + ' ' + error.data);
    			}
				if (object.errorMessageToUser){
					if (error.status === 404 && (typeof error.data==="string" && error.data.indexOf('Cannot GET /api/')===-1)){
						if (object.notFoundMessage) console.log(object.notFoundMessage);
						else alert(object.errorMessageToUser);
					} 
					else alert(object.errorMessageToUser);
				}
				if (object.errorCallback != null && object.errorCallback != undefined){
					object.errorCallback();
				}
			}
			function handleForbidden(){
				alert("You cant go here");
			}
		}
	}
})();
