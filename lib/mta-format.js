var timeFormat = require('./timeFormater');

class MtaFormat {
  constructor(elem) {
    this.original = elem;
    this.alert = elem.alert;
    this.line = this.getLine(elem);
    this.trip_id = this.getId(elem);
    this.direction = this.getDirection(elem);
    this.departureTimes = this.getDepartureTime(elem);
    this.arrivalTimes = this.getArrivalTime(elem);
    this.currentStop = this.getCurrentStop(elem);
    this.nextStop = '';
  }

  getCurrentStop(elem) {
    if (elem.trip_update !== null &&
        elem.trip_update.hasOwnProperty('stop_time_update')) {
      return elem.trip_update.stop_time_update[0].stop_id;
    }

    return null;
  }

  getArrivalTime(elem) {
    if (this.stopTimeCheck(elem)) {

      var arrivalTimes = [];

      elem.trip_update.stop_time_update.forEach(function(e) {
        if (e.arrival !== null && e.arrival.time !== null) {
          arrivalTimes.push(e.arrival.time.low);
        }
      });

      return arrivalTimes;

      //return this.dateFix(elem.trip_update.stop_time_update[0].arrival.time.low);
    }

    return null;
  }

  getDepartureTime(elem) {
    if (this.stopTimeCheck(elem)) {
      var departureTimes = [];

      elem.trip_update.stop_time_update.forEach(function(e) {
        if (e.departure !== null && e.departure.time !== null) {
          departureTimes.push(e.departure.time.low);
        }
      });

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
        elem.trip_update.hasOwnProperty('stop_time_update') &&
        elem.trip_update.stop_time_update[0].arrival !== null &&
        elem.trip_update.stop_time_update[0].departure !== null) {
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
