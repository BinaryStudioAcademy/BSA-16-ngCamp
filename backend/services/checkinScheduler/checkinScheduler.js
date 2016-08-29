var schedule = require('node-schedule');
var currentWeekNumber = require('current-week-number');
var scheduleCheckinsByFrequency = require('./scheduleCheckin');

function timeToCompare(){
	var currentDate = new Date();
	var dayOfWeek = currentDate.getDay();
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    return  {time: hour + ':' + minutes, dayOfWeek: dayOfWeek};
}

// var everyMonday = schedule.scheduleJob('* * * * 1', function (){
//     var time = timeToCompare();
// 	scheduleCheckinsByFrequency('Every Monday', time);
// });


// var everyMonday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: 1}, function (){
// 	scheduleCheckinsByFrequency('Every Monday')
// });

// var everyFriday = schedule.scheduleJob('* * * * 5', function(){
// 	var time = timeToCompare();
// 	scheduleCheckinsByFrequency('Every Friday', time);
// });


// var everyFriday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: 5}, function(){
// 	scheduleCheckinsByFrequency('Every Friday')
// });


// var everyOtherMonday = schedule.scheduleJob('* * * * 1', function(){
// 	if (currentWeekNumber()%2 === 0){
// 		scheduleCheckinsByFrequency('Every other Monday');
// 	}
	
// });

// var everyOtherMonday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: 1}, function(){
// 	if (currentWeekNumber()%2 === 0){
// 		scheduleCheckinsByFrequency('Every other Monday');
// 	}
	
// });

// var everyOtherFriday = schedule.scheduleJob('* * * * 5', function() {
// 	var time = timeToCompare();
// 	if (currentWeekNumber()%2 === 0){
// 		scheduleCheckinsByFrequency('Every other Friday', time);
// 	}
// });
	
// var everyOtherFriday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: 5}, function() {
// 	if (currentWeekNumber()%2 === 0){
// 		scheduleCheckinsByFrequency('Every other Friday');
// 	}
	
// });

var firstMondayOfEveryMonth = schedule.scheduleJob('* * * 1-7 1', function() {
	var time = timeToCompare();
	scheduleCheckinsByFrequency('First Monday of every month', time);
});


// var firstMondayOfEveryMonth = schedule.scheduleJob({hour: 6, minute: 30, dayOfMonth: [new schedule.Range(1, 7)], dayOfWeek: 1}, function() {
// 	scheduleCheckinsByFrequency('First Monday of every month');
// });
// var everyWeekday = schedule.scheduleJob('* * * * 1-5', function(){
var everyWeekday = schedule.scheduleJob('*/2 * * * * *', function(){
	var dayAndTime = timeToCompare();
	if(dayAndTime.dayOfWweek === 1){
		scheduleCheckinsByFrequency('Every Monday', dayAndTime.time);
		if (currentWeekNumber()%2 === 0){
			scheduleCheckinsByFrequency('Every other Monday');
		}
	} else if(dayAndTime.dayOfWweek === 5){
		scheduleCheckinsByFrequency('Every Friday', dayAndTime.time);
		if (currentWeekNumber()%2 === 0){
			scheduleCheckinsByFrequency('Every other Friday', dayAndTime.time);
		}
	}
	scheduleCheckinsByFrequency('Every weekday', dayAndTime.time);
});

// var everyWeekday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: [new schedule.Range(1, 5)] }, function(){
// 	scheduleCheckinsByFrequency('Every weekday')
// });

// var test = schedule.scheduleJob('*/2 * * * * *', function(){
// 	var currentDate = new Date();
//     var dayOfWeek = currentDate.getDay();
// 	console.log('sdfsdfsdf');
// 	scheduleCheckinsByFrequency('Every Monday');
// });



module.exports = {
	everyWeekday: everyWeekday
	// test: test
};