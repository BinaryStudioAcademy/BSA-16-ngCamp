import {app} from '../index';

import {timeIndicatorDirective} from './timeIndicator/timeIndicator.directive.js';
import {readMoreDirective} from './readMore/readMore.directive.js';

app.directive(timeIndicatorDirective.name, () => timeIndicatorDirective);
app.directive(readMoreDirective.name, () => readMoreDirective);