import {app} from '../index';

import {httpGeneral} from './httpGeneral.service.js';
import {popupNotifications} from './popupNotifications.service.js';
import {spinner} from './spinner.service.js';

app.service('httpGeneral', httpGeneral);
app.service('popupNotifications', popupNotifications);
app.service('spinner', spinner);