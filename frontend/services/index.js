import {app} from '../index';

import {httpGeneral} from './httpGeneral.service.js';
import {popupNotifications} from './popupNotifications.service.js';

app.service('httpGeneral', httpGeneral);
app.service('popupNotifications', popupNotifications);