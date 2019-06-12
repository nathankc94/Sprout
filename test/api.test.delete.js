var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;
describe("DELETE /api/projectExamples/1", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("delete 1 example", function(done) {
    // Add some examples to the db to test with
    db.projectExamples
      .bulkCreate([
        {
          title: "Chores App",
          body: "This API will help you create chores for your children.",
          skills: "Node.js, JavaScript",
          link: "https://www.google.com",
          tags: "chores"
        }
      ])
      .then(function() {
        request.delete("/api/projectExamples/1").end(function(err, res) {
          var responseStatus = res.status;

          // Run assertions on the response

          expect(err).to.be.null;

          expect(responseStatus).to.equal(200);

          // expect(responseBody)
          //   .to.be.an("object")
          //   .that.includes(reqBody);

          // The `done` function is used to end any asynchronous tests
          done();
        });
      });
  });
});
