import './commentsModal.style.styl';

class commentsModalController{
    constructor($scope,httpGeneral,popupNotifications){
        this.scope = $scope;
        this.modalToggle = false;
        this.http = httpGeneral;
        this.popup = popupNotifications;
        this.myComment = '';
    }

    toggle(){
        this.modalToggle = !this.modalToggle;
    }

    getUserAvatar(author){
        let self = this;
        let result;
        if(author.email){
            self.scope.usersInfo.forEach((elem)=>{
                if(elem.email === author.email){
                    result = elem.avatar;
                };
            });
        }else{
            result = author.avatar;
        }
        return result;

    }

    postMessage(){
        let self = this;
        console.log(`api/${self.scope.instanceType}/${self.scope.instanceId}/comment`);
        if (self.myComment.length) {
            self.scope.comments.push({
                author: {
                    firstName: window._injectedData.userFirstName,
                    lastName: window._injectedData.userLastName,
                    avatar: window._injectedData.avatar && window._injectedData.avatar.small ? window._injectedData.avatar.small : ''
                },
                date: new Date(),
                description: self.myComment,
            });
            self.http.sendRequest({
                type: "PUT",
                url: `api/${self.scope.instanceType}/${self.scope.instanceId}/comment`,
                body: [{
                    author: window._injectedData.userId,
                    date: new Date(),
                    description: self.myComment,
                }]
            }).then(function(res) {
                console.log("Succesfull send comment");
                self.myComment = '';
            });
        } else {
            console.log('test');
            self.popup.notifyError("Please enter comment correctly");
        }        
    }


}

commentsModalController.$inject = ["$scope","httpGeneral","popupNotifications"];

const commentsModalDirective = {
    template: require('./commentsModal.template.pug')(),
    name: 'commentsModal',
    controller: commentsModalController,
    controllerAs: 'cm',
    scope: {
        comments: '=',
        instanceType: '=',
        instanceId: '=',
        usersInfo: '='
    },
    link: commentsModalLink
};

function commentsModalLink(scope,element,attr,ctrl){

};

export {commentsModalDirective};