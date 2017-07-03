class TimeFormat {
  constructor(rawTime) {
    this.original = rawTime;
    this.hour = this.calcTime(rawTime.substring(0, 4));
    this.seconds = this.calcSeconds(rawTime.substring(rawTime.length - 2));
  }

  calcTime(time) {
    var adjustedTime = (Number(time) / 60);
    var h = Math.floor(adjustedTime);
    var m = Math.round((adjustedTime % h) * 60);

    var day = new Date();
    day.setTime(day.setHours(h, m) - new Date().getTimezoneOffset()*60*1000);

    return {
      adj: adjustedTime,
      hour: h,
      minutes: m || '00',
      actTime: day
    };
  }

  calcSeconds(seconds) {
    return (Number(seconds) * 60) / 100;
  }

}

var time = function(raw) {
  return new TimeFormat(raw);
};

module.exports = time;
