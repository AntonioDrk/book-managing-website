const express = require("express");
const router = express.Router();
const bookManager = require("../bookManager.js");
const Book = require("../classes/book.js");
const BookTypes = require("../classes/bookTypes.js");

/* GET books listing. */
router.get("/", function (req, res, next) {
  res.render("books", { books: bookManager.AllBooks });
});

router.get("/add", function (req, res, next) {
  res.render("bookCreation", { bookTypes: BookTypes });
});

router.post("/add", function (req, res, next) {
  // Input validation should be done here
  let title = req.body["titleInput"];
  let author = req.body["authorInput"];
  let publisher = req.body["publisherInput"];
  let type = req.body["typeInput"];
  let price = req.body["priceInput"];
  let dateOfPub = new Date(req.body["dateInput"]);
  let msgView = "Book added with success";
  if (
    bookManager.AddBook(
      new Book(
        bookManager.StaticIndex,
        title,
        author,
        publisher,
        dateOfPub,
        price,
        type
      )
    )
  ) {
    // Added with success
  } else {
    // Duplicate
    msgView = "This book already exists in the database";
  }
  res.render("books", {
    books: bookManager.AllBooks,
    msg: msgView
  });
});

router.get("/edit/:bookId", function (req, res, next) {
  var bookQueried = bookManager.GetBook(Number(req.params["bookId"]));
  if (bookQueried) {
    res.render("bookEdit", { bookTypes: BookTypes, book: bookQueried });
  } else {
    res.render("books", {
      books: bookManager.AllBooks,
      msg: "No such book"
    });
  }
});

router.post("/edit/:bookId", function (req, res, next) {
  var bookQueried = bookManager.GetBook(Number(req.params["bookId"]));
  if (bookQueried) {
    bookQueried.Title = req.body["titleInput"];
    bookQueried.Author = req.body["authorInput"];
    bookQueried.Publisher = req.body["publisherInput"];
    bookQueried.Price = req.body["priceInput"];
    bookQueried.Type = req.body["typeInput"];
    bookQueried.DateOfPub = new Date(req.body["dateInput"]);
  } else {
    res.render("books", {
      books: bookManager.AllBooks,
      msg: "No such book"
    });
  }
  res.render("books", {
    books: bookManager.AllBooks,
    msg: "Book updated with success"
  });
});

/* GET a specific book */
router.get("/:bookId", function (req, res, next) {
  var bookQueried = bookManager.GetBook(Number(req.params["bookId"]));
  if (bookQueried) {
    res.render("bookDetails", { book: bookQueried });
  } else {
    res.render("books", {
      books: bookManager.AllBooks,
      msg: "No such book"
    });
  }
});

router.get("/delete/:bookId", function (req, res, next) {
  if (bookManager.DeleteBook(Number(req.params["bookId"]))) {
    res.render("books", {
      books: bookManager.AllBooks,
      msg: "Book deleted with success"
    });
  } else {
    res.render("books", {
      books: bookManager.AllBooks,
      msg: "No such book"
    });
  }
});

router.post("/update", function (req, res, next) {});

module.exports = router;
