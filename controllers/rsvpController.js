var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
require("../models/Rsvp");
var Rsvp = mongoose.model('Rsvp');
var parse = require("date-fns/parse"),
    startOfDay = require('date-fns/start_of_day'),
    endOfDay = require('date-fns/end_of_day');

/**
 * Gets coordinates (lon, lat) from the request and returns Groups
 * ordered by distance. limit can be used as a query param to set
 * the maximum number of results to return.
 * 
 * Valid queries examples:
 * /near?lon=-5.612983&lat=43.522799&limit=3
 * /near?lon=-5.612983&lat=43.522799
 * 
 * @param  {} req - The received request.
 * @param  {} res - The response to be sent whit the result.
 */
exports.getNear = (req, res) => {
  // Check required params
  if (!req.query.lon || !req.query.lat) {
    res.status(400).send("Bad request");
    return;
  }

  // Find nearest and keep only groups
  var query = Rsvp.find(
    {
      group_location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              req.query.lon,
              req.query.lat
            ]
          }
        }
      }
    }, { group: 1 }
  );
  if (req.query.limit) {
    query.limit(Number(req.query.limit));
  }
  query.find((err, rsvps) => {
    if (err) res.status(500).send(err.message);
    // Flatten groups array before sending
    res.send(rsvps.map((d) => d.group));
  });
}

/**
 * Gets a date from the request and returns the top cities
 * sorted by the number of people attending events in that city
 * on that day.
 * 
 * @param  {} req - The received request.
 * @param  {} res - The response to be sent whit the result.
 */
exports.getTopCities = (req, res) => {
  // Check required params
  if (!req.query.date) {
    res.status(400).send("Bad request");
    return;
  }

  var date = startOfDay(req.query.date);
  var nextDay = endOfDay(req.query.date);

  var query = Rsvp.aggregate([
    { $match: { event_time: { $gte: date, $lte: nextDay } } },
    { $group: { _id: "$group.group_city", people: { $sum: "$guests" } } },
    { $sort: { people: -1 } }
  ]);
  if (req.query.limit) {
    query.limit(Number(req.query.limit));
  }
  query.exec((err, topCities) => {
    if (err) res.status(500).send(err.message);
    // Flatten groups array before sending
    res.send(topCities.map((d) => (
      {
        city: d._id,
        people: d.people,
      }
    )));
  });
}

