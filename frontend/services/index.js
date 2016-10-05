import {app} from '../index';

import {httpGeneral} from './httpGeneral.service.js';
import {popupNotifications} from './popupNotifications.service.js';
import {spinner} from './spinner.service.js';
import {DailyCalendarHelper} from './dailyCalendarHelper.service.js';
import {reportsGUI} from './reports.gui.service.js';
import {UserService} from './user.service.js';
import {mainPageCheckinData} from './mainPageCheckinData.service.js';

app.service('httpGeneral', httpGeneral);
app.service('popupNotifications', popupNotifications);
app.service('spinner', spinner);
app.service('DailyCalendarHelper', DailyCalendarHelper);
app.service('reportsGUI', reportsGUI);
app.service('UserService', UserService);
app.service('mainPageCheckinData', mainPageCheckinData);