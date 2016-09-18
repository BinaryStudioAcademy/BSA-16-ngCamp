import {app} from '../index';

import {timeIndicatorDirective} from './timeIndicator/timeIndicator.directive.js';
import {readMoreDirective} from './readMore/readMore.directive.js';
import {userListDirective} from './userList/userList.directive.js';
import {angularResizableDirective} from "./angularResizable/angularResizable.directive.js";
import {ckEditorDirective} from './ckeditor/ckeditor.directive.js';
import {fileUploadDirective} from './fileUpload/fileUpload.directive.js';
import {filesWrapperDirective} from './filesWrapper/filesWrapper.directive.js';
import {escKeyDirective} from './escKey/esc.directive.js';

app.directive(timeIndicatorDirective.name, () => timeIndicatorDirective);
app.directive(readMoreDirective.name, () => readMoreDirective);
app.directive('resizable', angularResizableDirective);
app.directive(ckEditorDirective.name, () => ckEditorDirective);
app.directive(userListDirective.name, () => userListDirective);
app.directive(fileUploadDirective.name, () => fileUploadDirective);
app.directive(filesWrapperDirective.name, ()=> filesWrapperDirective);
app.directive(escKeyDirective.name, ()=> escKeyDirective);

