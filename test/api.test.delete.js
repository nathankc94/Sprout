var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;
describe("DELETE /api/projectExamples/1", function () {
    // Before each test begins, create a new request server for testing
    // & delete all examples from the db
    beforeEach(function () {
        request = chai.request(server);
        db.sequelize.sync({ force: true }).then(function () {
            return db.projectExamples
                .bulkCreate([
                    {
                        title: "Chores App",
                        body: "This API will help you create chores for your children.",
                        skills: "Node.js, JavaScript",
                        link: "https://www.google.com",
                        tags: "chores"
                    },

                ]);

        });
    });
            // Add some examples to the db to test with

    it("delete a record", function (done) {

        // Create an object to send to the endpoint
        var reqBody = {
            title: "Chores App",
            body: "This API will help you create chores for your children.",
            skills: "Node.js, JavaScript",
            link: "https://www.google.com",
            tags: "chores"
        };

        // Delete the request body to the server
        request
            .delete("/api/projectExamples/1")
            .send(reqBody)
            .end(function (err, res) {
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