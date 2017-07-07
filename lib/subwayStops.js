var fs = require('fs');

var data = fs.readFileSync('lib/mta-new-york-city-transit_2017_07_04/stops.txt', 'utf8').trim().split('\n').map(function(line) {
  return line.split(',');
});

class SubwayStopsList {
  constructor() {
    this.stops = this.getStopName(data);
  }

  getStopName(data) {
    var station = [];

    data.forEach(function(dataRow) {
      station.push({
        stop_name: dataRow[2],
        stop_id: dataRow[0]
      });
    });

    return station;
  }
}

var stops = function() {
  return new SubwayStopsList();
};

module.exports = stops;
