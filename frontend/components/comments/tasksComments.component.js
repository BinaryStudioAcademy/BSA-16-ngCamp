import "./commentsStyle.styl";

class tasksCommentsComponentController {
    constructor(httpGeneral, $window, popupNotifications, userService) {
        this.httpGeneral = httpGeneral;
        this.popupNotification = popupNotifications;
        this.userService = userService;
        this.comments = [];
        this.taskId;
    }
    $routerOnActivate(next) {
        let self = this;
        self.backLink = 'TasksList';
        self.taskId = next.params.id;
        let async = require('async');

        async.waterfall([
            function(callback) {
                self.userService.getExternalUsersData().then(function(data) {
                    self.externalUsersData = data;
                    callback(null, data);
                });
            },
            function(extUsers, callback) {
                self.httpGeneral.sendRequest({
                    type: "GET",
                    url: "api/checkins"
                }).then(function(res) {
                    self.httpGeneral.sendRequest({
                        type: "GET",
                        url: `/api/checkins/${next.params.id}/withparticipants`
                    }).then(function(res) {
                        self.httpGeneral.sendRequest({
                            type: "GET",
                            url: `api/task/${next.params.id}/comments`,
                        }).then(function(res) {
                            if (!res || !res.comments) return;
                            self.comments = res.comments;

                            if (self.externalUsersData && self.externalUsersData.length && self.comments && self.comments.length) {
                                for (let i = 0; i < self.comments.length; i++) {
                                    if (self.comments[i].author && self.comments[i].author.email) {
                                        let user = self.userService.getUserByEmail(self.comments[i].author.email, self.externalUsersData);
                                        if (user.avatar) {
                                            if (user.avatar.thumbnailUrlAva) self.comments[i].author.avatar = user.avatar.thumbnailUrlAva;
                                            else if (user.avatar.urlAva) self.comments[i].author.avatar = user.avatar.urlAva;
                                        }
                                    }
                                }
                            }
                        });
                    });
                    callback(null, null);
                });
            }
        ]);
    }
    sendComment(valid) {
        let self = this;
        self.comments.push({
            author: {
                firstName: window._injectedData.userFirstName,
                lastName: window._injectedData.userLastName,
                avatar: window._injectedData.avatar && window._injectedData.avatar.small ? window._injectedData.avatar.small : ''
            },
            date: new Date(),
            description: self.myComment,
        });
        if (valid) {
            self.httpGeneral.sendRequest({
                type: "PUT",
                url: `api/task/${self.taskId}/comment`,
                body: [{
                    author: window._injectedData.userId,
                    date: new Date(),
                    description: self.myComment,
                }]
            }).then(function(res) {
                console.log("Succesfull send comment");
            });
        } else {
            self.popupNotifications.notifyError("Please enter comment correctly");
        }
    }
}

tasksCommentsComponentController.$inject = ['httpGeneral', '$window', 'popupNotifications', 'UserService'];

const tasksCommentsComponent = {
    controller: tasksCommentsComponentController,
    selector: "tasksCommentsComponent",
    template: require("./eventsComments.template.pug")(),
};

export {
    tasksCommentsComponent
};