const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const Employee = require("../model/schema/employee");
const should = chai.should();

chai.use(chaiHttp);
describe("/GET /users", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Employee.deleteMany({}, (err) => {
      done();
    });
    Employee.insertMany([
      { id: "e0001", login: "superman", name: "Superman", salary: 3020.304 },
      { id: "e0002", login: "rwesley", name: "rwesley", salary: 2000.5 },
      { id: "e0003", login: "ssnape", name: "ssnape", salary: 4000.0 },
      { id: "e0004", login: "rhagrid,", name: "rhagrid", salary: 300.5 },
      { id: "e0005", login: "gogo", name: "gogo", salary: 19234.5 },
      { id: "e0007", login: "hgranger", name: "hgranger", salary: 500 },
    ])
      .then(() => {
        console.log("Sample Data added");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  describe("Valid Queries", () => {
    it("Return Employee have salary betweem 0-4000 and sorted Desc by id", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=0&maxSalary=4000&offset=0&limit=30&sort=-id")
        .end((err, res) => {
          res.body.results.length.should.be.eql(5);
          res.body.results[0].should.be.eql({
            id: "e0007",
            login: "hgranger",
            name: "hgranger",
            salary: 500,
          });
          res.body.results[1].should.be.eql({
            id: "e0004",
            login: "rhagrid,",
            name: "rhagrid",
            salary: 300.5,
          });
          res.body.results[2].should.be.eql({
            id: "e0003",
            login: "ssnape",
            name: "ssnape",
            salary: 4000.0,
          });
          res.body.results[3].should.be.eql({
            id: "e0002",
            login: "rwesley",
            name: "rwesley",
            salary: 2000.5,
          });
          res.body.results[4].should.be.eql({
            id: "e0001",
            login: "superman",
            name: "Superman",
            salary: 3020.304,
          });
          done();
        });
    });
    it("Return Employee have salary betweem 0-4000 and sorted Ascending by login", (done) => {
      chai
        .request(server)
        .get(
          "/users?minSalary=0&maxSalary=4000&offset=0&limit=30&sort=%2Blogin"
        )
        .end((err, res) => {
          res.body.results.length.should.be.eql(5);
          res.body.results[0].should.be.eql({
            id: "e0007",
            login: "hgranger",
            name: "hgranger",
            salary: 500,
          });
          res.body.results[1].should.be.eql({
            id: "e0004",
            login: "rhagrid,",
            name: "rhagrid",
            salary: 300.5,
          });
          res.body.results[2].should.be.eql({
            id: "e0002",
            login: "rwesley",
            name: "rwesley",
            salary: 2000.5,
          });
          res.body.results[3].should.be.eql({
            id: "e0003",
            login: "ssnape",
            name: "ssnape",
            salary: 4000.0,
          });
          res.body.results[4].should.be.eql({
            id: "e0001",
            login: "superman",
            name: "Superman",
            salary: 3020.304,
          });
          done();
        });
    });
    it("Return Employee have salary betweem 0-4000 and sorted Ascending by name", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=0&maxSalary=4000&offset=0&limit=30&sort=%2Bname")
        .end((err, res) => {
          res.body.results.length.should.be.eql(5);
          res.body.results[0].should.be.eql({
            id: "e0001",
            login: "superman",
            name: "Superman",
            salary: 3020.304,
          });
          res.body.results[1].should.be.eql({
            id: "e0007",
            login: "hgranger",
            name: "hgranger",
            salary: 500,
          });
          res.body.results[2].should.be.eql({
            id: "e0004",
            login: "rhagrid,",
            name: "rhagrid",
            salary: 300.5,
          });
          res.body.results[3].should.be.eql({
            id: "e0002",
            login: "rwesley",
            name: "rwesley",
            salary: 2000.5,
          });
          res.body.results[4].should.be.eql({
            id: "e0003",
            login: "ssnape",
            name: "ssnape",
            salary: 4000.0,
          });
          done();
        });
    });
    it("Return Employee have salary betweem 0-4000 and sorted Ascending by salary", (done) => {
      chai
        .request(server)
        .get(
          "/users?minSalary=0&maxSalary=4000&offset=0&limit=30&sort=%2Bsalary"
        )
        .end((err, res) => {
          res.body.results.length.should.be.eql(5);
          res.body.results[0].should.be.eql({
            id: "e0004",
            login: "rhagrid,",
            name: "rhagrid",
            salary: 300.5,
          });
          res.body.results[1].should.be.eql({
            id: "e0007",
            login: "hgranger",
            name: "hgranger",
            salary: 500,
          });
          res.body.results[2].should.be.eql({
            id: "e0002",
            login: "rwesley",
            name: "rwesley",
            salary: 2000.5,
          });
          res.body.results[3].should.be.eql({
            id: "e0001",
            login: "superman",
            name: "Superman",
            salary: 3020.304,
          });
          res.body.results[4].should.be.eql({
            id: "e0003",
            login: "ssnape",
            name: "ssnape",
            salary: 4000.0,
          });
          done();
        });
    });
    it("Return Employee have salary betweem 2000-3500 and sorted Desc by id", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=2000&maxSalary=3500&offset=0&limit=30&sort=-id")
        .end((err, res) => {
          console.log(res.body.results);
          res.body.results.length.should.be.eql(2);
          res.body.results[0].should.be.eql({
            id: "e0002",
            login: "rwesley",
            name: "rwesley",
            salary: 2000.5,
          });
          res.body.results[1].should.be.eql({
            id: "e0001",
            login: "superman",
            name: "Superman",
            salary: 3020.304,
          });
          done();
        });
    });
    it("Return Employee have salary betweem 2000-3500 and sorted Ascending by id", (done) => {
      chai
        .request(server)
        .get(
          "/users?minSalary=2000&maxSalary=3500&offset=0&limit=30&sort=%2Bid"
        )
        .end((err, res) => {
          console.log(res.body.results);
          res.body.results.length.should.be.eql(2);
          res.body.results[0].should.be.eql({
            id: "e0001",
            login: "superman",
            name: "Superman",
            salary: 3020.304,
          });
          res.body.results[1].should.be.eql({
            id: "e0002",
            login: "rwesley",
            name: "rwesley",
            salary: 2000.5,
          });
          done();
        });
    });
  });

  // Test Invalid Queries
  describe("Invalid Queries", () => {
    it("Missing minSalary param", (done) => {
      chai
        .request(server)
        .get("/users?maxSalary=3500&offset=0&limit=30&sort=%2Bid")
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("Missing parameter of minSalary");
          done();
        });
    });
    it("Missing maxSalary param", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=2000&offset=0&limit=30&sort=%2Bid")
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("Missing parameter of maxSalary");
          done();
        });
    });
    it("Missing offset param", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=2000&maxSalary=3500&limit=30&sort=%2Bid")
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("Missing parameter of offset");
          done();
        });
    });
    it("Missing limit param", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=2000&maxSalary=3500&offset=0&sort=%2Bid")
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("Missing parameter of limit");
          done();
        });
    });
    it("Missing sort param", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=2000&maxSalary=3500&offset=0&limit=30")
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("Missing parameter of sort");
          done();
        });
    });
    it("minSalary not a Number", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=abc&maxSalary=3500&offset=0&limit=30&sort=%2Bid")
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("minSalary is not a Number");
          done();
        });
    });
    it("maxSalary not a Number", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=2000&maxSalary=abc&offset=0&limit=30&sort=%2Bid")
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("maxSalary is not a Number");
          done();
        });
    });
    it("maxSalary < minSalary", (done) => {
      chai
        .request(server)
        .get(
          "/users?minSalary=3500&maxSalary=2000&offset=0&limit=30&sort=%2Bid"
        )
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql(
            "Invalid query as the minSalary is more than maxSalary"
          );
          done();
        });
    });
    it("Invalid sort Params", (done) => {
      chai
        .request(server)
        .get("/users?minSalary=2000&maxSalary=3500&offset=0&limit=30&sort=+2id")
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("Sort query is invalid");
          done();
        });
    });
    it("Invalid sort params", (done) => {
      chai
        .request(server)
        .get(
          "/users?minSalary=2000&maxSalary=3500&offset=0&limit=30&sort=-people"
        )
        .end((err, res) => {
          res.status.should.be.eql(400);
          res.body.message.should.be.eql("Sort column is invalid");
          done();
        });
    });
  });
});
