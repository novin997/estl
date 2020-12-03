const splitEasy = require("csv-split-easy");

/**
 * @desc Validate the CSV File and check if it can be
 * @param string csvfile - csv file in utf-8 format
 * @return bool - success or failure
 */

const validateCsv = (csvfile) => {
  return new Promise(function (resolve, reject) {
    const csv = splitEasy(csvfile);

    if (csv.empty()) reject(false);
    /**
     * not optimal 0(N)
     */
    csv.shift();

    csv.map((val, index) => {
      /**
       * check if all 4 columns are filled up
       * if not ignore line
       */
      if (val.length === 4) {
        if (val[3] < 0 || val[0][0] == "#") reject(false);
      } else {
        reject(false);
      }
      resolve(true);
    });
  });
};

module.exports = validateCsv;
