var schedule = require('node-schedule');
var currentWeekNumber = require('current-week-number');
var scheduleCheckinsByFrequency = require('./scheduleCheckin');

var everyMonday = schedule.scheduleJob('*/2 * * * * *', function (){
	console.log('every what');
	scheduleCheckinsByFrequency('Every Monday')
});


// var everyMonday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: 1}, function (){
// 	scheduleCheckinsByFrequency('Every Monday')
// });

// var everyFriday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: 5}, function(){
// 	scheduleCheckinsByFrequency('Every Friday')
// });

// var everyOtherMonday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: 1}, function(){
// 	if (currentWeekNumber()%2 === 0){
// 		scheduleCheckinsByFrequency('Every other Monday');
// 	}
	
// });

// var everyOtherFriday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: 5}, function() {
// 	if (currentWeekNumber()%2 === 0){
// 		scheduleCheckinsByFrequency('Every other Friday');
// 	}
	
// });

// var firstMondayOfEveryMonth = schedule.scheduleJob({hour: 6, minute: 30, dayOfMonth: [new schedule.Range(1, 7)], dayOfWeek: 1}, function() {
// 	scheduleCheckinsByFrequency('First Monday of every month');
// });

// var everyWeekday = schedule.scheduleJob({hour: 6, minute: 30, dayOfWeek: [new schedule.Range(1, 5)] }, function(){
// 	scheduleCheckinsByFrequency('Every weekday')
// });

var test = schedule.scheduleJob('*/2 * * * * *', function(){
	var currentDate = new Date();
    var dayOfWeek = currentDate.getDay();
	console.log('sdfsdfsdf');
	scheduleCheckinsByFrequency('Every Monday');
});



module.exports = {
	everyMonday: everyMonday,
	// everyFriday: everyFriday,
	// everyOtherMonday: everyOtherMonday,
	// everyOtherFriday: everyOtherFriday,
	// firstMondayOfEveryMonth: firstMondayOfEveryMonth,
	// everyWeekday: everyWeekday,
	test: test
};