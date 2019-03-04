process.env.NODE_ENV = "test";

var config  = require("../config");
var groups = require("./groups");

// dev dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../bin/www");
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe("GET /near", () => {
    it("returns 400 Bad request", (done) => {
      chai.request("http://localhost:" + config.port)
          .get("/near")
          .end((err, res) => {
                res.should.have.status(400);
            done();
          });
    });
});

describe("GET /near?lon=-5.612983", () => {
  it("returns 400 Bad request", (done) => {
    chai.request("http://localhost:" + config.port)
        .get("/near?lon=-5.612983")
        .end((err, res) => {
              res.should.have.status(400);
          done();
        });
  });
});

describe("GET /near?lat=43.522799", () => {
  it("returns 400 Bad request", (done) => {
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