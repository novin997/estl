const chai = require("chai");
const chaiHttp = require("chai-http");
const Employee = require("../model/schema/employee");
const server = require("../index");
const path = require("path");
const should = chai.should();

chai.use(chaiHttp);
describe("/POST /users/upload", () => {
  beforeEach((done) => {
    Employee.deleteMany({}, (err) => {
      done();
    });
  });
  describe("upload csv", () => {
    it("upload csv with duplicate login in the file", (done) => {
      chai
        .request(server)
        .post("/users/upload")
        .field("Content-Type", "multipart/form-data")
        .attach("file", path.resolve(__dirname, "../csv/bad_1.csv"))
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql(
            "Duplicated login of voldemort in the current csv file"
          );
          done();
        });
    });

    it("upload csv with duplicate id in the file", (done) => {
      chai
        .request(server)
        .post("/users/upload")
        .field("Content-Type", "multipart/form-data")
        .attach("file", path.resolve(__dirname, "../csv/bad_2.csv"))
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql(
            "Duplicated id of e0002 in the current csv file"
          );
          done();
        });
    });

    it("upload empty csv file", (done) => {
      chai
        .request(server)
        .post("/users/upload")
        .field("Content-Type", "multipart/form-data")
        .attach("file", path.resolve(__dirname, "../csv/bad_3.csv"))
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql("Empty csv file");
          done();
        });
    });

    it("Successfully update DB with comments", (done) => {
      chai
        .request(server)
        .post("/users/upload")
        .field("Content-Type", "multipart/form-data")
        .attach("file", path.resolve(__dirname, "../csv/good_1.csv"))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.eql(
            "CSV File has been Upload Successfully."
          );
          done();
        });
    });
  });

  describe("Test with Data in the DB", () => {
    beforeEach((done) => {
      Employee.deleteMany({});
      chai
        .request(server)
        .post("/users/upload")
        .field("Content-Type", "multipart/form-data")
        .attach("file", path.resolve(__dirname, "../csv/good_1.csv"))
        .end((err, res) => {
          res.body.message.should.be.eql(
            "CSV File has been Upload Successfully."
          );
          done();
        });
    });

    it("Upload Fail because of duplicate login in DB", (done) => {
      chai
        .request(server)
        .post("/users/upload")
        .field("Content-Type", "multipart/form-data")
        .attach("file", path.resolve(__dirname, "../csv/update_fail.csv"))
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be.eql(
            "The login value of voldemort is already in the database"
          );
          done();
        });
    });

    it("Successful Update to the DB", (done) => {
      chai
        .request(server)
        .post("/users/upload")
        .field("Content-Type", "multipart/form-data")
        .attach("file", path.resolve(__dirname, "../csv/update_pass.csv"))
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.eql(
            "CSV File has been Upload Successfully."
          );
          done();
        });
    });

    it("Special case of Updating the login after it has been free up", (done) => {
      chai
        .request(server)
        .post("/users/upload")
        .field("Content-Type", "multipart/form-data")
        .attach(
          "file",
          path.resolve(__dirname, "../csv/update_special_pass.csv")
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be.eql(
            "CSV File has been Upload Successfully."
          );
          done();
        });
    });
  });
});
