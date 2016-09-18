import "./commentsStyle.styl";

class tasksCommentsComponentController{
	constructor(httpGeneral,$window,popupNotifications){
		this.httpGeneral = httpGeneral;
		this.popupNotification = popupNotifications;
		this.comments = [];
        this.taskId;
	}
	$routerOnActivate(next) {
        let self = this;
        self.taskId = next.params.id;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: `api/task/${next.params.id}/comments`,
        }).then(function(res) {
            if (res === undefined){
                console.log("No comments for this task");
            } else self.comments = res.comments;
        });
    }
    sendComment(valid) {
        let self = this;
        self.comments.push({
            author: {firstName:window._injectedData.userFirstName,lastName:window._injectedData.userLastName},
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

tasksCommentsComponentController.$inject = ['httpGeneral','$window','popupNotifications'];

const tasksCommentsComponent = {
    controller: tasksCommentsComponentController,
    selector: "tasksCommentsComponent",
    template: require("./tasksComments.template.pug")(),
};

export {
    tasksCommentsComponent
};