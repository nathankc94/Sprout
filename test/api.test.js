var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/projectExamples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.projectExamples
      .bulkCreate([
        {
          title: "Chores App",
          body: "This API will help you create chores for your children.",
          skills: "Node.js, JavaScript",
          link: "https://www.google.com",
          tags: "chores"
        },
        {
          title: "Cats APP",
          body: "This API will help you find the best cats for your life.",
          skills: "Node.js, JavaScript",
          link: "https://www.catsapp.com",
          tags: "cats"
        }
      ])
      .then(function() {
        // Request the route that returns all examples
        request.get("/api/projectExamples").end(function(err, res) {
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
              skills: "Node.js, JavaScript",
              link: "https://www.google.com",
              tags: "chores"
            });

          expect(responseBody[1])
            .to.be.an("object")
            .that.includes({
              title: "Cats APP",
              body: "This API will help you find the best cats for your life.",
              skills: "Node.js, JavaScript",
              link: "https://www.catsapp.com",
              tags: "cats"
            });

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});

describe("POST /api/projectExample", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should save an example", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
      title: "Chores App",
      body: "This API will help you create chores for your children.",
      skills: "Node.js, JavaScript",
      link: "https://www.google.com",
      tags: "chores"
    };

    // POST the request body to the server
    request
      .post("/api/projectExamples")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});