import './checkinsStyles.styl';

class CheckinsComponentController {
    constructor(http) {
        this.http = http;
    }
}

CheckinsComponentController.$inject = [
    'httpGeneral'
];

const checkinsComponent = {
    controller: CheckinsComponentController,
    selector: 'checkinsComponent',
    template: require('./checkins-pug.component.pug')(),
    $routeConfig: [{
        path:'/',
        name:'Checkins List',
        component:'checkinsListComponent',
        useAsDefault: true
    },{
        path: '/info/:id',
        name: 'CheckinsInfo',
        component: 'checkinsInfoComponent'
    
    },{
       path: '/create/',
       name: 'CheckinsCreate',
       component: 'checkinsCreateComponent'
    },{
        path: '/edit/:id',
        name: 'CheckinsEdit',
        component: 'checkinsEditComponent'
        }
    ]
};

export {
    checkinsComponent
};