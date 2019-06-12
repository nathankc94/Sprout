var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

// Library Lists Test

describe("GET /api/libraryLists", function () {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all library lists", function (done) {
    // Add some examples to the db to test with
    db.libraryLists
      .bulkCreate([
        {
          title: "Chores API",
          body: "This API will help you create chores for your children.",
          score: 4,
          link: "https://www.google.com",
        },
        {
          title: "Cats API",
          body: "This API will help you find the cutest cats",
          score: 5,
          link: "https://www.google.com",
        }
      ])
      .then(function () {
        // Request the route that returns all library lists
        request.get("/api/libraryLists").end(function (err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;

          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(2);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
              title: "Chores API",
              body: "This API will help you create chores for your children.",
              score: 4,
              link: "https://www.google.com",
            });

          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
              title: "Cats API",
              body: "This API will help you find the cutest cats",
              score: 5,
              link: "https://www.google.com",
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});

//API Lists

describe("GET /api/apiLists", function () {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function () {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function (done) {
    // Add some examples to the db to test with
    db.apiLists
      .bulkCreate([
        {
          title: "Chores App",
          body: "This API will help you create chores for your children.",
          score: 4,
          link: "https://www.google.com",
        },
        {
          title: "Cats App",
          body: "App that will list the food the cat likes and dislikes.",
          score: 5,
          link: "https://www.google.com",
         
        }
      ])
      .then(function () {
        // Request the route that returns all examples
        request.get("/api/apiLists").end(function (err, res) {
          var responseStatus = res.status;
          var responseBody = res.body;

          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          expect(responseBody)
            .to.be.an("array")
            .that.has.lengthOf(2);

          expect(responseBody[0])
            .to.be.an("object")
            .that.includes({
                title: "Chores App",
                body: "This API will help you create chores for your children.",
                score: 4,
                link: "https://www.google.com",
            });

          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
                title: "Cats App",
                body: "App that will list the food the cat likes and dislikes.",
                score: 5,
                link: "https://www.google.com",
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});