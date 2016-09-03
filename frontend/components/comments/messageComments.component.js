import "./commentsStyle.styl";



class messageCommentsComponentController {
    constructor(httpGeneral, $window, popupNotifications) {
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.popupNotifications = popupNotifications;
        this.messageId;
        this.comments = [];
        this.myComment;
    }
    $routerOnActivate(next) {
        let self = this;
        self.messageId = next.params.id;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/messages/${next.params.id}/comments`,
        }).then(function(res) {
            self.comments = res.comments;
        });
    }
    sendComment(valid) {
        let self = this;
        if (valid) {
            self.httpGeneral.sendRequest({
                type: "PUT",
                url: `api/messages/${self.messageId}/comment`,
                body: [{
                    author: window._injectedData.userId,
                    date: new Date(),
                    description: self.myComment,
                }]
            }).then(function(res) {
                console.log("Succesfull send comment");
                self.window.location.reload();
            });
        } else {
            self.popupNotifications.notifyError("Please enter comment correctly");
        }
    }
};

messageCommentsComponentController.$inject = ['httpGeneral', '$window', 'popupNotifications'];

const messageCommentsComponent = {
    controller: messageCommentsComponentController,
    selector: "messageCommentsComponent",
    template: require("./messageComments.template.pug")(),
};

export {
    messageCommentsComponent
};