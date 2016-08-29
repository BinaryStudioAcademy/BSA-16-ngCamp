function timeToCompare(){
	var currentDate = new Date();
	var dayOfWeek = currentDate.getDay();
    var hour = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    return  {time: hour + ':' + minutes, dayOfWeek: dayOfWeek};
}

module.exports = timeToCompare;