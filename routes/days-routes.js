//All about fetching days
// route /day : Fetch data from Day table and show n the left(GET):Tatiana
const express = require("express");
const router = express.Router();
const { showDay } = require("../controllers/days.js");

router.get("/day", showDay);

module.exports = router;
