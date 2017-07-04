var timeFormat = require('./timeFormater');
var stopFinder = require('./stopFinder');

class MtaFormat {
  constructor(elem) {
    this.original = elem;
    this.alert = elem.alert;
    this.line = this.getLine(elem);
    this.trip_id = this.getId(elem);
    this.direction = this.getDirection(elem);
    this.departureTimes = this.getDepartureTime(elem, this.dateFix());
    this.arrivalTimes = this.getArrivalTime(elem, this.dateFix());
    this.currentStop = this.getCurrentStop(elem);
    this.currentStopName = stopFinder(this.getCurrentStop(elem));
    this.nextStop = '';
  }

  getCurrentStop(elem) {
    if (elem.trip_update !== null &&
        elem.trip_update.hasOwnProperty('stop_time_update')) {
      return elem.trip_update.stop_time_update[0].stop_id;
    }

    return null;
  }

  getArrivalTime(elem, dateFix) {
    if (this.stopTimeCheck(elem)) {
      var arrivalTimes = [];

      for (let i = 0; i < elem.trip_update.stop_time_update.length; i++) {
        if (elem.trip_update.stop_time_update[i].arrival !== null) {
          arrivalTimes.push(this.dateFix(elem.trip_update.stop_time_update[i].arrival.time.low));
        }
      }

      return arrivalTimes;
    }

    return null;
  }

  getDepartureTime(elem, dateFix) {
    if (this.stopTimeCheck(elem)) {
      var departureTimes = [];

      for (let i = 0; i < elem.trip_update.stop_time_update.length; i++) {
        if (elem.trip_update.stop_time_update[i].departure !== null) {
          departureTimes.push(this.dateFix(elem.trip_update.stop_time_update[i].departure.time.low));
        }
      }

      return departureTimes;
    }

    return null;
  }

  dateFix(time) {
    let timeOffset = new Date().getTimezoneOffset() * 60 * 1000;
    return new Date((time * 1000) - timeOffset);
  }

  stopTimeCheck(elem) {
    if (elem.trip_update !== null &&
        elem.trip_update.hasOwnProperty('stop_time_update')) {
        return true;
    }

    return false;
  }

  nullCheck(elem, attr) {
    if (elem.trip_update !== null &&
        elem.trip_update.hasOwnProperty('trip') &&
        elem.trip_update.trip.hasOwnProperty(attr)) {
        return true;
    }

    return false;
  }

  getLine(elem) {
    if (this.nullCheck(elem, 'route_id')) {
      return elem.trip_update.trip.route_id;
    }

    return null;
  }

  getId(elem) {
    if (this.nullCheck(elem, 'trip_id')) {
      return elem.trip_update.trip.trip_id;
    }

    return null;
  }

  getDirection(elem) {
    if (this.nullCheck(elem, 'trip_id')) {
      var chunk = elem.trip_update.trip.trip_id.split('..')[1];

      if (chunk !== undefined) {
        switch(chunk.charAt(0).toUpperCase()) {
          case 'N':
            return 'North';
            break;
          case 'S':
            return 'South';
            break;
          case 'E':
            return 'East';
            break;
          case 'W':
            return 'West';
            break;
          default:
            return null;
        }
      }
    }

    return null;
  }

  // getDepartureTime(elem) {
  //   if (this.nullCheck(elem, 'trip_id')) {
  //     var chunk = elem.trip_update.trip.trip_id.split('_')[0];
  //
  //     return {
  //       original: chunk,
  //       TimeClass: timeFormat(chunk)
  //     };
  //   }
  //
  //   return null;
  // }
}

var format = function(elem) {
  return new MtaFormat(elem);
};

module.exports = format;
