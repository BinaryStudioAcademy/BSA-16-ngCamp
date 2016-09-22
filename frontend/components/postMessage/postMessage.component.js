import './postMessage.styl';

class postMessageController {
    constructor(httpGeneral, $window, $location, popupNotifications) {
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.location = $location;
        this.popupNotifications = popupNotifications;
        this.title;
        this.desc;
        this.files = [];
        this.invalidForm = false;
        this.date = new Date();
        this.tinyOptions = {
            inline: true,
            theme: 'inlite',
            plugins: 'image link paste contextmenu textpattern autolink lists',
            insert_toolbar: false,
            selection_toolbar: 'bold italic | quicklink h2 h3 blockquote | bullist numlist outdent indent',
            selector: '.descEditor'
        };
    }

    post(valid) {
        let self = this;
        if (valid) {
            self.httpGeneral.sendRequest({
                type: "POST",
                url: "api/messages",
                body: {
                    data: {
                        title: self.title,
                        description: self.desc,
                        project: window._injectedData.currentProject,
                        date: self.date,
                        author: window._injectedData.userId,
                        isDraft: false,
                        files: self.files.map(function (elem) {
                            return elem._id;
                        }),
                    }
                }
            }).then(function (res) {
                console.log("Succesfull create new message");
                self.location.path('/messageboard');
            });
        } else {
            this.invalidForm = true;
            self.popupNotifications.notifyError("Plese complete all fields correctly");
        }
    }

    draft(valid) {
        let self = this;
        if (valid) {
            self.httpGeneral.sendRequest({
                type: "POST",
                url: "api/messages",
                body: {
                    data: {
                        title: self.title,
                        description: self.desc,
                        project: window._injectedData.currentProject,
                        data: self.date,
                        author: window._injectedData.userId,
                        isDraft: true,
                    }
                }
            }).then(function (res) {
                console.log("Succesfull create new draft");
                self.popupNotifications.notifySuccess("Succesfull create draft");
            });
        } else {
            self.popupNotifications.notifyError("Plese complete all fields correctly");
        }
    }
}

postMessageController.$inject = ['httpGeneral', '$window', '$location', 'popupNotifications'];

const postMessageComponent = {
    controller: postMessageController,
    controllerAs: 'postCtrl',
    template: require('./postMessage.pug')(),
    selector: 'postMessage'
};

export {
    postMessageComponent
};