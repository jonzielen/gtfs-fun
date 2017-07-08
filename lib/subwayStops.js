var fs = require('fs');
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var subwayStops = fs.readFileSync('lib/mta-new-york-city-transit_2017_07_04/stops.txt', 'utf8').trim().split('\n').map(function(line) {
  return line.split(',');
});

var requestSettings = {
  method: 'GET',
  url: 'http://datamine.mta.info/mta_esi.php?key=93a8fc8d8119b97680ceaf08a729cfd7&feed_id=1',
  encoding: null
};

// 123456S
// http://datamine.mta.info/mta_esi.php?key=93a8fc8d8119b97680ceaf08a729cfd7&feed_id=1

// NQRW
// http://datamine.mta.info/mta_esi.php?key=93a8fc8d8119b97680ceaf08a729cfd7&feed_id=16

// BD
//  http://datamine.mta.info/mta_esi.php?key=93a8fc8d8119b97680ceaf08a729cfd7&feed_id=21

// L
// http://datamine.mta.info/mta_esi.php?key=93a8fc8d8119b97680ceaf08a729cfd7&feed_id=2

var trainDetails = [];

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);

    feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        trainDetails.push(entity);
      }
    });
  }
});

class SubwayStopsList {
  constructor() {
    //this.stops = this.getStopName(subwayStops);
    //this.data = this.getTrainData(trainDetails);
    this.stopData = this.addTrainDataToStop(this.getStopName(subwayStops), this.getTrainData(trainDetails));
    this.aaa = this.stopData.length;
  }

  getStopName(stops) {
    var station = [];

    stops.forEach(function(dataRow, index) {
      if (index > 0) {
        station.push({
          stop_name: dataRow[2],
          stop_id: dataRow[0]
        });
      }
    });

    return station;
  }

  getTrainData(train) {
    var data = train.reduce(function(prev, curr, index, array) {
      if (curr.hasOwnProperty('trip_update') &&
          curr.trip_update.hasOwnProperty('stop_time_update')) {

          curr.trip_update.stop_time_update.map(function(stop) {
            prev.push(stop);
          });
      }

      return prev;
    }, []);


    return data || null;
  }

  addTrainDataToStop(stops, data) {
    var finalStops = stops.reduce(function(prev, curr, index, array) {

      var jom = [];

      data.map(function(elem, i) {
        if (curr.stop_id === elem.stop_id) {
          jom.push(elem);
        }
      });

      curr.details = jom;

      if (jom.length > 0) {
        prev.push({
          curr: curr
        });
      }

      return prev;

    }, []);

    return finalStops;
  }
}

var stops = function() {
  return new SubwayStopsList();
};

module.exports = stops;
