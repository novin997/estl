const splitEasy = require("csv-split-easy");
const Employee = require("../schema/employee");

/**
 * @desc Validate the CSV File and check provide the actions to talk to insert data to db
 * @param string csvfile - csv file in utf-8 format
 * @return Sucesss: Data to send to Database
 * @return Failure: Error Message which will be response to the client
 */

function validateCsv(csvfile) {
  return new Promise((resolve, reject) => {
    const csv = splitEasy(csvfile);
    const dataDB = { data: [], actions: [] };

    console.log(csv);

    // https://stackoverflow.com/questions/19701502/how-to-improve-nested-if-else-statements
    // Try to improve the nested if else loop if there is time
    const loop = csv.map(async (val, index) => {
      /**
       * Ignore the First Row
       */
      if (index !== 0) {
        /**
         * Check for comments
         */
        if (val[0][0] !== "#") {
          /**
           * Check for valid num of columns
           */
          if (val.length === 4) {
            /**
             * Check if salary is negative
             */
            if (val[3] >= 0.0) {
              /**
               * Check if id is present in the database
               */
              const duplicateId = await Employee.findOne({ id: val[0] });
              if (!duplicateId) {
                dataDB.data.push({
                  id: val[0],
                  login: val[1],
                  name: val[2],
                  salary: val[3],
                });
                dataDB.actions.push("AddEmployee");
              } else {
                /**
                 * if id is already present,
                 * we will check if there is any other user with the same login
                 */
                const duplicateLogin = await Employee.findOne({
                  login: val[1],
                });
                if (!duplicateLogin) {
                  dataDB.data.push({
                    id: val[0],
                    login: val[1],
                    name: val[2],
                    salary: val[3],
                  });
                  dataDB.actions.push("UpdateEmployee");
                } else {
                  reject(
                    "Unable to update the Employee due to a duplicate in the login parameter"
                  );
                }
              }
            } else reject(`Salary at Line ${index} is negative`);
          } else reject("Invalid Columns in CSV File");
        } else {
          console.log("comment");
        }
      }
    });
    Promise.all(loop).then(() => {
      resolve(dataDB);
    });
  });
}

module.exports = validateCsv;
