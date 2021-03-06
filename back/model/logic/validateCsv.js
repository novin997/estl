const splitEasy = require("csv-split-easy");
const Employee = require("../schema/employee");

/**
 * @desc Validate the CSV File and check provide the actions to talk to insert data to db
 * @param string csvfile - csv file in utf-8 format
 * @return Sucesss: Data to send to Database
 * @return Failure: Error Message which will be response to the client
 */

function validateCsv(csvfile) {
  return new Promise(async (resolve, reject) => {
    const csv = splitEasy(csvfile);
    console.log(csv);
    if (csv.length <= 1) {
      reject(`Empty csv file`);
    }

    let dataDB = { data: [], actions: [] };

    /**
     * Create 4 set to keep track of all the transaction that will cause duplicate
     * @idSet when a new Id is added to db, the id will be placed in this set.
     *        This is done so that there is no same id within the same csv.
     * @removedLoginSet The login added in when there is an id found in the system
     * @addedLoginSet The set will be inserted when there is a new employee added
     *                or when there is an update to a present employee id
     */
    let idSet = new Set();
    let removedLoginSet = new Set();
    let addedLoginSet = new Set();

    // https://stackoverflow.com/questions/19701502/how-to-improve-nested-if-else-statements
    // Try to improve the nested if else loop if there is time

    for (const [index, val] of csv.entries()) {
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
              if (idSet.has(val[0]))
                reject(`Duplicated id of ${val[0]} in the current csv file`);
              if (addedLoginSet.has(val[1]))
                reject(`Duplicated login of ${val[1]} in the current csv file`);
              const duplicateId = await Employee.findOne({ id: val[0] });
              if (!duplicateId) {
                const duplicateLogin = await Employee.findOne({
                  login: val[1],
                });
                if (duplicateLogin && !removedLoginSet.has(val[1]))
                  reject(
                    `The login value of ${val[1]} is already in the database`
                  );
                dataDB.data.push({
                  id: val[0],
                  login: val[1],
                  name: val[2],
                  salary: val[3],
                });
                idSet.add(val[0]);
                addedLoginSet.add(val[1]);
                dataDB.actions.push("AddEmployee");
                console.log(index);
              } else {
                /**
                 * if id is already present,
                 * we will check if there is any other user with the same login
                 */
                if (addedLoginSet.has(val[1]))
                  reject(
                    `Duplicated login of ${val[1]} in the current csv file`
                  );
                const duplicateLogin = await Employee.findOne({
                  login: val[1],
                });
                if (!duplicateLogin || removedLoginSet.has(val[1])) {
                  dataDB.data.push({
                    id: val[0],
                    login: val[1],
                    name: val[2],
                    salary: val[3],
                  });
                  addedLoginSet.add(val[1]);
                  removedLoginSet.add(duplicateId.login);
                  removedLoginSet.delete(val[1]);
                  dataDB.actions.push("UpdateEmployee");
                } else {
                  reject(
                    `The login value of ${val[1]} is already in the database`
                  );
                }
              }
            } else reject(`Salary at Line ${index} is negative`);
          } else reject("Invalid number of columns in csv file");
        } else {
          console.log("comment");
        }
      }
    }
    resolve(dataDB);
  });
}

module.exports = validateCsv;
