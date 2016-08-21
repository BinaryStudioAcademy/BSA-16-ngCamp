import {app} from '../index';
import {notFoundComponent} from './notFound/notFound.component.js';
import {userComponent} from './user/user.component.js';
import {trashComponent} from './trash/trash.component.js';
import {rootComponent} from './root/root.component.js';
import {mainComponent} from './main/main.component.js';
import {messageBoardComponent} from './messageBoard/messageBoard.component.js';
import {filesComponent} from './files/files.component.js';
import {postMessageComponent} from './postMessage/postMessage.component.js';
import {editMessageComponent} from './editMessage/editMessage.component.js';
import {projectComponent} from './project/project.component.js';
import {checkinsComponent} from './checkins/checkins.component.js';
import {checkinsCreateComponent} from './checkinsCreate/checkinsCreate.component.js';
import {checkinsInfoComponent} from './checkinsInfo/checkinsInfo.component.js';
import {menuComponent} from './menu/menu.component';
import {headerComponent} from './header/header.component';
import {commentsComponent} from "./comments/comments.component";
import {reportsComponent} from "./reports/reports.component";
import {eventsComponent} from "./events/events.component.js";
import {eventListComponent} from "./events/eventList.component.js";
import {eventCreateComponent} from "./events/eventCreate.component.js";
import {eventEditComponent} from "./events/eventEdit.component.js";
import {tasksComponent} from "./tasks/tasks.component.js";
import {draftsComponent} from "./drafts/drafts.component.js";
import {testComponent} from "./test/test.component.js";
import {createProjectComponent} from "./createProject/createProject.component.js";
import {readMoreDirective} from "./readMore/readMore.directive.js";


app.component(messageBoardComponent.selector, messageBoardComponent);
app.component(filesComponent.selector, filesComponent);
app.component(postMessageComponent.selector, postMessageComponent);
app.component(editMessageComponent.selector, editMessageComponent);
app.component(rootComponent.selector, rootComponent);
app.component(userComponent.selector, userComponent);
app.component(mainComponent.selector, mainComponent);
app.component(trashComponent.selector, trashComponent);
app.component(checkinsComponent.selector, checkinsComponent);
app.component(checkinsCreateComponent.selector, checkinsCreateComponent);
app.component(checkinsInfoComponent.selector, checkinsInfoComponent);
app.component(menuComponent.selector, menuComponent);
app.component(headerComponent.selector, headerComponent);
app.component(notFoundComponent.selector, notFoundComponent);
app.component(projectComponent.selector, projectComponent);
app.component(eventsComponent.selector, eventsComponent);
app.component(commentsComponent.selector, commentsComponent);
app.component(reportsComponent.selector, reportsComponent);
app.component(eventCreateComponent.selector, eventCreateComponent);
app.component(eventEditComponent.selector, eventEditComponent);
app.component(eventListComponent.selector, eventListComponent);
app.component(tasksComponent.selector, tasksComponent);
app.component(testComponent.selector, testComponent);
app.component(draftsComponent.selector, draftsComponent);
app.component(createProjectComponent.selector, createProjectComponent);
app.directive(readMoreDirective.name, ()=>readMoreDirective);
