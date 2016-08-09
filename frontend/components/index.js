import {app} from '../index';
import {notFoundComponent} from './notFound.component.js';
import {userComponent} from './user/user.component.js';
import {rootComponent} from './root/root.component.js';
import {mainComponent} from './main/main.component.js';

app.component(rootComponent.selector, rootComponent);
app.component(userComponent.selector, userComponent);
app.component(notFoundComponent.selector, notFoundComponent);
app.component(mainComponent.selector, mainComponent);