const splitEasy = require("csv-split-easy");
const Employee = require("../schema/employee");

/**
 * @desc Validate the CSV File and check if it can be
 * @param string csvfile - csv file in utf-8 format
 * @return bool - success or failure
 */

const validateCsv = (csvfile) => {
  return new Promise(function (resolve, reject) {
    const csv = splitEasy(csvfile);
    const dataDB = [];

    console.log(csv);

    csv.map((val, index) => {
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
            } else reject(`Salary at Line ${index} is negative`);
          } else reject("Invalid Columns in CSV File");
        } else {
          console.log("comment");
        }
      }
    });
  });
};

module.exports = validateCsv;
