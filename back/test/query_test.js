const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const Employee = require("../model/schema/employee");
const should = chai.should();

chai.use(chaiHttp);
describe("/GET /users", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Employee.remove({}, (err) => {
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
  describe("Query DB", () => {
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
  });
});
