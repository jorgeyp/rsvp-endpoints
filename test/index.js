process.env.NODE_ENV = "test";

var config  = require("../config");
// Should create test database
var groups = require("./groups");
var cities = require("./cities");

// dev dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../bin/www");
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

// GET /near tests

describe("GET /near", () => {
    it("returns 400 Bad request with missing parameters", (done) => {
      chai.request("http://localhost:" + config.port)
          .get("/near")
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    });
});

describe("GET /near?lon=-5.612983", () => {
  it("returns 400 Bad request with missing lat", (done) => {
    chai.request("http://localhost:" + config.port)
        .get("/near?lon=-5.612983")
        .end((err, res) => {
              res.should.have.status(400);
          done();
        });
  });
});

describe("GET /near?lat=43.522799", () => {
  it("returns 400 Bad request with missing lon", (done) => {
    chai.request("http://localhost:" + config.port)
        .get("/near?lat=43.522799")
        .end((err, res) => {
              res.should.have.status(400);
          done();
        });
  });
});

describe("GET /near?lon=-5.612983&lat=43.522799&limit=2", () => {
  it("returns 2 nearest groups to Gijón", (done) => {
    chai.request("http://localhost:" + config.port)
        .get("/near?lon=-5.612983&lat=43.522799&limit=2")
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.eql(groups);
          done();
        });
  });
});

// GET /topCities tests

describe("GET /topCities?date=2019-03-06", () => {
  it("returns top cities on 2019-03-06 by guests", (done) => {
    chai.request("http://localhost:" + config.port)
        .get("/topCities?date=2019-03-06&limit=5")
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});

describe("GET /topCities?date=2019-03-06&limit=5", () => {
  it("returns top 5 cities on 2019-03-06 by guests", (done) => {
    chai.request("http://localhost:" + config.port)
        .get("/topCities?date=2019-03-06&limit=5")
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.eql(cities);
          done();
        });
  });
});

describe("GET /topCities?limit=5", () => {
  it("returns 400 Bad request with missing date", (done) => {
    chai.request("http://localhost:" + config.port)
        .get("/topCities?limit=5")
        .end((err, res) => {
              res.should.have.status(400);
          done();
        });
  });
});