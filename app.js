const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const indexRouter = require("./routes/index");
const booksRouter = require("./routes/books");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public/images")));

app.get("/", indexRouter);
app.use("/books", booksRouter);

const listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
