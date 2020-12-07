/**
 * @desc Validate the query parameters before extracing data from the mongoDB
 * @param query Object of all query parameters
 * @return Promise of formated query parameters or if failure will return error
 */
const validateQuery = (query) => {
  return new Promise((resolve, reject) => {
    const minSalary = Number(query.minSalary);
    const maxSalary = Number(query.maxSalary);
    const offset = Number(query.offset);
    const limit = Number(query.limit);
    const sortOrder = query.sort.substring(0, 1);
    const sortBy = query.sort.substring(1);

    // Check if minSalary is Number
    if (typeof minSalary !== "number") reject("minSalary is not a Number");

    // Check if maxSalary is Number
    if (typeof maxSalary !== "number") reject("maxSalary is not a Number");

    if (minSalary > maxSalary)
      reject("Invalid query as the minSalary is more than maxSalary");

    if (!(sortOrder === "+" || sortOrder === "-"))
      reject("SortOrder query is invalid");

    if (
      !(
        sortBy === "id" ||
        sortBy === "name" ||
        sortBy === "login" ||
        sortBy === "salary"
      )
    )
      reject("SortOrder query is invalid");

    resolve({
      minSalary: minSalary,
      maxSalary: maxSalary,
      offset: offset,
      limit: limit,
      sortOrder: sortOrder,
      sortBy: sortBy,
    });
  });
};

module.exports = validateQuery;
