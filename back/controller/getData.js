const express = require("express");
const { readDB } = require("../model/logic/crudDB");
const validateQuery = require("../model/logic/validateQuery");

const route = express.Router();

route.get("/", async (req, res) => {
  const validatedQuery = await validateQuery(req.query).catch((err) => {});
  const result = await readDB(validatedQuery);
  console.log(result);
  res.json({ data: result });
});

module.exports = route;
