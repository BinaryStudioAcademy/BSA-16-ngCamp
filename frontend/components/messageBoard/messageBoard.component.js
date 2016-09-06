import './messageBoard.styl';

class messageBoardController {
    constructor(httpGeneral, $location, $window) {
        this.httpGeneral = httpGeneral;
        this.location = $location;
        this.window = $window;
        this.messages = [];
        this.isBigText = false;
    }
    $onInit() {
        let self = this;
        let i = 0;
        self.httpGeneral.sendRequest({
            type: "GET",
            url: "api/messages"
        }).then(function(res) {
            for (let msg in res) {
                if (res[msg].project === window._injectedData.currentProject) {
                    self.messages.push(res[msg]);
                    self.messages[i].showFull = false;
                    let len = self.messages[i].description.length;
                    if (self.messages[i].description.length > 400) {
                        self.messages[i].isBigText = true;
                        self.messages[i].firstPart = self.messages[i].description.substring(0, 400);
                        self.messages[i].secondPart = self.messages[i].description.substring(401, self.messages[i].description.length);
                    } else {
                        self.messages[i].isBigText = false;
                    }
                    i++;
                }
            };
        });
    }
    showText(index) {
        let self = this;
        self.messages[index].showFull = true;
    }
    hideText(index) {
        let self = this;
        self.messages[index].showFull = false;
    }
}

messageBoardController.$inject = ['httpGeneral', '$location', '$window'];

const messageBoardComponent = {
    controller: messageBoardController,
    controllerAs: 'msgBoard',
    template: require('./messageBoard.pug')(),
    selector: 'messageBoard'
};

export {
    messageBoardComponent
};