class MtaFormat {
  constructor(elem) {
    this.original = elem;
    this.alert = elem.alert;
    this.line = this.getLine(elem);
    this.trip_id = this.getId(elem);
    this.direction = this.getDirection(elem);
    this.departureTime = this.getDepartureTime(elem);
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

  getDepartureTime(elem) {
    if (this.nullCheck(elem, 'trip_id')) {
      var chunk = elem.trip_update.trip.trip_id.split('_')[0];

      return {
        original: chunk,
        hour: chunk.substring(0, 4),
        seconds: chunk.substring(chunk.length - 2)
      };
    }

    return null;
  }
}

var format = function(elem) {
  return new MtaFormat(elem);
};

module.exports = format;
