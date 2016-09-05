var date = require('s-date');

function timeToCompare() {
    var currentDate = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var dayOfWeekString = days[currentDate.getDay()];
    var dayOfWeekNumber = currentDate.getDay()
    var minutes = date('{Minutes}', currentDate);
    var hour = date('{hh24}', currentDate);
    return  {time: hour + ':' + minutes, dayOfWeekString: dayOfWeekString, dayOfWeekNumber: dayOfWeekNumber};
}

module.exports = timeToCompare;