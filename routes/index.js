var express = require("express");
var router = express.Router();
var bookManager = require("../bookManager.js");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { books: bookManager.AllBooks });
});

module.exports = router;
