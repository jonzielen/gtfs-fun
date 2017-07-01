var express = require('express');
var router = express.Router();
var GtfsRealtimeBindings = require('gtfs-realtime-bindings');
var request = require('request');

var requestSettings = {
  method: 'GET',
  url: 'http://datamine.mta.info/mta_esi.php?key=93a8fc8d8119b97680ceaf08a729cfd7&feed_id=1',
  encoding: null
};

var data = request(requestSettings, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = GtfsRealtimeBindings.FeedMessage.decode(body);
    return feed.entity.forEach(function(entity) {
      if (entity.trip_update) {
        return entity.trip_update;
      }
    });
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
