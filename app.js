/**
 * App module.
 * @module app
 */

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var indexRouter = require("./routes/index");
var db = require("./db");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", indexRouter);

module.exports = app;
