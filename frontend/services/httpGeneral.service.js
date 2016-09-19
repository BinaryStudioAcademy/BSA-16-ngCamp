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

class httpGeneral {

    constructor($http, $window, $location, spinner, rootRouter) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
        this.spinner = spinner;
        this.rootRouter = rootRouter;
    }

    sendRequest(object) {
        let self = this;
        self.spinner.startSpinn();
        if (typeof object.url !== 'string' || object.url === undefined || object.url.length === 0) {
            self.spinner.stopSpinn();
            throw "HTTP REQUEST EROR: REQUEST ULR IS ABSENT";

        } else {
            console.log('\n\nURL');
            console.log(object.url);
            console.log(object.url.indexOf('/profile/user/getByCentralId/'));
            if (object.url.indexOf('/profile/user/getByCentralId/') === -1) {
                if (object.url[0] === '/') object.url = '.' + object.url;
                else object.url = './' + object.url;
            }
        }
        if (typeof object.type !== 'string' || object.type === undefined || object.type.length === 0) {
            self.spinner.stopSpinn();
            throw "HTTP REQUEST EROR: REQUEST TYPE IS ABSENT";
        }
        switch (object.type.toLowerCase()) {
            case 'get':
                return this.$http.get(object.url).then(succesfullRequest, failedRequest);
            case 'post':
                return this.$http.post(object.url, object.body.data).then(succesfullRequest, failedRequest);
            case 'put':
                return this.$http.put(object.url, object.body).then(succesfullRequest, failedRequest);
            case 'delete':
                return this.$http.delete(object.url).then(succesfullRequest, failedRequest);
        }

        function succesfullRequest(res) {
            self.spinner.stopSpinn();
            //console.log("Succesfull Request");
            //alert(object.successMessageToUser);
            return res.data;
        }

        function failedRequest(error) {
            self.spinner.stopSpinn();
            if (error.status === 403) {
                handleForbidden();
                return null;
            }
            if (object.errorMessageToDev) {
                if (error.data && error.data.message) {
                    console.log(object.errorMessageToDev + ' ' + error.data.message);
                } else console.log(object.errorMessageToDev + ' ' + error.data);
            }
            if (object.errorMessageToUser) {
                if (error.status === 404 && (typeof error.data === "string" && error.data.indexOf('Cannot GET /api/') === -1)) {
                    if (object.notFoundMessage) console.log(object.notFoundMessage);
                    else alert(object.errorMessageToUser);
                } else alert(object.errorMessageToUser);
            }
            if (object.errorCallback != null && object.errorCallback != undefined) {
                object.errorCallback(error.data);
            }
        }

        function handleForbidden() {
            if (self.location.path().indexOf('checkins') > 0 && window._injectedData.isCheckinsEdit === false) {
                self.rootRouter.navigate(['Main Page']);
                return;
            }
            if (self.location.path().indexOf('reports') > 0 && window._injectedData.isReports === false) {
                self.rootRouter.navigate(['Main Page']);
                return;
            }
            self.$window.location.href = "http://team.binary-studio.com/auth/#/";
        }
    }
}

httpGeneral.$inject = ['$http', '$window', '$location', 'spinner', '$rootRouter'];

export {
    httpGeneral
};