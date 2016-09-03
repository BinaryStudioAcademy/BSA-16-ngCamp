var schedule = require('node-schedule');
var currentWeekNumber = require('current-week-number');
var scheduleCheckinsByFrequency = require('./scheduleCheckin');
var timeToCompare = require('./timeToCompare');

var getToken = require('./generateToken');
//var tokens = require('./tokens');



var firstMondayOfEveryMonth = schedule.scheduleJob('* * * 1-7 1', function() {
    var time = timeToCompare();
    scheduleCheckinsByFrequency('First Monday of every month', time);
});

var test = schedule.scheduleJob('* * * * *', function () {
    var dayAndTime = timeToCompare();
    scheduleCheckinsByFrequency(dayAndTime.dayOfWeekString, dayAndTime.time);
    //scheduleCheckinsByFrequency('Every weekday', dayAndTime.time);
});

//var everyWeekday = schedule.scheduleJob('* * * * 1-5', function(){
//    var dayAndTime = timeToCompare();
//    if(dayAndTime.dayOfWweek === 1){
//        scheduleCheckinsByFrequency('Every Monday', dayAndTime.time);
//        if (currentWeekNumber()%2 === 0){
//            scheduleCheckinsByFrequency('Every other Monday');
//        }
//    } else if(dayAndTime.dayOfWweek === 5){
//        scheduleCheckinsByFrequency('Every Friday', dayAndTime.time);
//        if (currentWeekNumber()%2 === 0){
//            scheduleCheckinsByFrequency('Every other Friday', dayAndTime.time);
//        }
//    }
//    scheduleCheckinsByFrequency('Every weekday', dayAndTime.time);
//});

module.exports = {
    firstMondayOfEveryMonth: firstMondayOfEveryMonth,
    //everyWeekday: everyWeekday,
    test: test
};