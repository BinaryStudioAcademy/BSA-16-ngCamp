import {app} from '../index';

import {timeIndicatorDirective} from './timeIndicator/timeIndicator.directive.js';

app.directive(timeIndicatorDirective.name, () => timeIndicatorDirective);