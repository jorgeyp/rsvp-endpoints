var express = require("express");
var router = express.Router();
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
require("../models/Rsvp");
var Rsvp = mongoose.model('Rsvp');


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// http://localhost:3000/near?lon=-5.612983&lat=43.522799&limit=3
router.get("/near", (req, res, next) => {

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
});

module.exports = router;
