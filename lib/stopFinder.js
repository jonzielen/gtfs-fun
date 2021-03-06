var fs = require('fs');

var data = fs.readFileSync('lib/mta-new-york-city-transit_2017_07_04/stops.txt', 'utf8').trim().split('\n').map(function(line) {
  return line.split(',');
});

class FindStop {
  constructor(id) {
    this.id = id;
    this.stopName = this.getStopName(id, data);
  }

  getStopName(id, list) {
    let name;

    list.find(function(listRow) {
      if (id == listRow[0]) name = listRow[2];
    });

    return name;
  }
}

var stop = function(id) {
  return new FindStop(id).stopName;
};

module.exports = stop;
