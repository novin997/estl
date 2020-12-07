const Employee = require("../schema/employee");

const writeDB = (result) => {
  return new Promise((resolve, reject) => {
    const data = result.data;
    const actions = result.actions;

    const loop = data.map(async (item, index) => {
      const action = actions[index];
      switch (action) {
        case "AddEmployee":
          const temp = new Employee(item);
          await temp.save().catch((err) => {
            reject(err);
          });
          break;
        case "UpdateEmployee":
          await Employee.updateOne(
            { id: item.id },
            {
              login: item.login,
              name: item.name,
              salary: item.salary,
            }
          );
          break;
        default:
        // code block
      }
    });
    Promise.all(loop).then(() => {
      resolve("All Data has been Uploaded to Database");
    });
  });
};

const readDB = (query) => {
  return new Promise((resolve, reject) => {
    const minSalary = query.minSalary;
    const maxSalary = query.maxSalary;
    const offset = query.offset;
    const limit = query.limit;
    const sortOrder = query.sortOrder;
    const sortBy = query.sortBy;

    Employee.find({
      salary: { $gte: minSalary },
      salary: { $lte: maxSalary },
    })
      .sort({ [sortBy]: sortOrder === "+" ? 1 : -1 })
      .skip(offset)
      .limit(limit)
      .exec((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
  });
};

module.exports = { writeDB, readDB };
