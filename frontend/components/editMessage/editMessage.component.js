import './editMessage.styl';

class editMessageController {
    constructor(httpGeneral, $location, $window, popupNotifications) {
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.window = $window;
        this.popupNotifications = popupNotifications;
        this.draft;
        this.files = [];
        this.invalidForm = false;
        this.tinyOptions = {
            inline: true,
            theme: 'inlite',
            plugins: 'image link paste contextmenu textpattern autolink lists',
            insert_toolbar: false,
            selection_toolbar: 'bold italic | quicklink h2 h3 blockquote | bullist numlist outdent indent',
            selector: '.descEditor'
        };
    }
    $routerOnActivate(next) {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/messages/${next.params.id}`
        }).then(function(res) {
            self.draft = res;
        });
    }
    edit(valid) {
        let self = this;
        if (valid) {
            self.httpGeneral.sendRequest({
                type: "PUT",
                url: `api/messages/${self.draft._id}`,
                body: {
                    title: self.draft.title,
                    description: self.draft.description,
                    date: new Date(),
                    author: window._injectedData.userId,
                    files: self.draft.files.map((elem)=>{return elem._id;})
                }
            }).then(function(res) {
                self.popupNotifications.notifySuccess("Succesfull edit message");
            });
        } else {
            self.invalidForm = true;
            self.popupNotifications.notifyError("Plese complete all fields correctly");
        }
    }
    postDraft(valid) {
        let self = this;
        if (valid) {
            self.httpGeneral.sendRequest({
                type: "PUT",
                url: `api/messages/${self.draft._id}`,
                body: {
                    title: self.draft.title,
                    description: self.draft.description,
                    date: new Date(),
                    author: window._injectedData.userId,
                    isDraft: false,
                }
            }).then(function(res) {
                self.popupNotifications.notifySuccess("Succesfull post draft");
            });
        } else {
            self.invalidForm = true;
            self.popupNotifications.notifyError("Plese complete all fields correctly");
        }
    }
    delete() {
        let self = this;
        self.httpGeneral.sendRequest({
            type: "DELETE",
            url: `api/messages/${self.draft._id}`,
        }).then(function(res) {
            self.location.path("/messageboard");
            self.popupNotifications.notifySuccess("You delete message");
        });
    }
}

editMessageController.$inject = ['httpGeneral', '$location', '$window', 'popupNotifications'];

const editMessageComponent = {
    controller: editMessageController,
    controllerAs: 'editCtrl',
    template: require('./editMessage.pug')(),
    selector: 'editMessage'
};

export {
    editMessageComponent
};