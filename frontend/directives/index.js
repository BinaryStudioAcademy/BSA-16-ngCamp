import {app} from '../index';

import {timeIndicatorDirective} from './timeIndicator/timeIndicator.directive.js';
import {readMoreDirective} from './readMore/readMore.directive.js';
import {userListDirective} from './userList/userList.directive.js';
import {angularResizableDirective} from "./angularResizable/angularResizable.directive.js";
import {ckEditorDirective} from './ckeditor/ckeditor.directive.js';

app.directive(timeIndicatorDirective.name, () => timeIndicatorDirective);
app.directive(readMoreDirective.name, () => readMoreDirective);
app.directive('resizable', angularResizableDirective);
app.directive(ckEditorDirective.name, () => ckEditorDirective);
app.directive(userListDirective.name, () => userListDirective);

