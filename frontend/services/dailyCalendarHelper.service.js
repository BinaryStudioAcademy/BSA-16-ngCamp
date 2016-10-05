class DailyCalendarHelper {
    constructor() {
        let dc = this;
        dc.timeStampsDaily = '00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23'
            .split('|');
    }

    getTimeStampsDaily() {
        let dc = this;
        let timeStampsObj = [];
        for (let i = 0; i < dc.timeStampsDaily.length; i++) {
            let timeObj = {};
            timeObj.value = dc.timeStampsDaily[i];
            timeObj.isWorkingHour = !!(i >= 9 && i <= 18);
            timeObj.index = i;
            timeStampsObj.push(timeObj);
        }
        return timeStampsObj;
    }
}

DailyCalendarHelper.$inject = [];

export {DailyCalendarHelper};