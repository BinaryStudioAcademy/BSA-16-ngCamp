import "./commentsStyle.styl";



class eventsCommentsComponentController {
    constructor(httpGeneral, $window, popupNotifications, userService) {
        this.httpGeneral = httpGeneral;
        this.window = $window;
        this.popupNotifications = popupNotifications;
        this.userService = userService;
        this.messageId;
        this.comments = [];
        this.myComment;
    }
    $routerOnActivate(next) {
        let self = this;
        self.messageId = next.params.id;

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
                            url: `api/event/${next.params.id}/comments`,
                        }).then(function(res) {
                            self.comments = res.comments;

                            if (self.externalUsersData && self.externalUsersData.length && self.comments && self.comments.length) {
                                for (var i = 0; i < self.comments.lengthl i++) {
                                    if (self.comments[i].author && self.comments[i].author.email) {
                                        var user = self.userService.getUserByEmail(self.comments[i].author.email, self.externalUsersData);
                                        if (user.avatar) {
                                            if (user.avatar.thumbnailUrlAva) self.comments[i].author.avatar = user.avatar.thumbnailUrlAva;
                                            else(user.avatar.urlAva) self.comments[i].author.avatar = user.avatar.urlAva;
                                        }
                                    }
                                }
                            }
                            console.log('comments', self.comments);
                        });
                    });
                    callback(null, null);
                });
            }
        ]);



        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/event/${next.params.id}/comments`,
        }).then(function(res) {
            self.comments = res.comments;
        });
    }
    sendComment(valid) {
        let self = this;
        self.comments.push({
            author: {
                firstName: window._injectedData.userFirstName,
                lastName: window._injectedData.userLastName
            },
            date: new Date(),
            description: self.myComment,
        });
        if (valid) {
            self.httpGeneral.sendRequest({
                type: "PUT",
                url: `api/event/${self.messageId}/comment`,
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
};

eventsCommentsComponentController.$inject = ['httpGeneral', '$window', 'popupNotifications', 'UserService'];

const eventsCommentsComponent = {
    controller: eventsCommentsComponentController,
    selector: "eventsCommentsComponent",
    template: require("./eventsComments.template.pug")(),
};

export {
    eventsCommentsComponent
};