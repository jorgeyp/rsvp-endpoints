var express = require("express");
var router = express.Router();
require("../models/Rsvp");
var RsvpController = require("../controllers/rsvpController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET /near */
router.get("/near", RsvpController.getNear);

module.exports = router;
