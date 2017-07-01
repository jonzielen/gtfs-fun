var express = require('express');
var router = express.Router();
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');
var mtaFormat = require('../lib/mta-format');

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


var data = [];

request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);

    feed.entity.forEach(function(entity) {
      data.push(mtaFormat(entity));
    });

    // feed.entity.forEach(function(entity, index) {
    //   if (index === 1) {
    //     data.push(entity);
    //   }
    //
    //   if (entity.trip_update) {
    //     data.push(mtaFormat(entity.trip_update.trip));
    //     return entity.trip_update.trip;
    //   }
    // });
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    gtfs: data
  });
});

module.exports = router;
