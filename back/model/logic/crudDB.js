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

module.exports = writeDB;
