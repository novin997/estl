const express = require("express");
const { readDB } = require("../model/logic/crudDB");
const validateQuery = require("../model/logic/validateQuery");

const route = express.Router();

route.get("/", async (req, res) => {
  console.log(req.query);
  const validatedQuery = await validateQuery(req.query);
  const result = await readDB(validatedQuery);
  console.log(result);
  res.status(200).json({ results: result });
});

module.exports = route;
