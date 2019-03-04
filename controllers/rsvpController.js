var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
require("../models/Rsvp");
var Rsvp = mongoose.model('Rsvp');

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