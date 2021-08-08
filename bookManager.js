// Test only, remove after implementing post
const Book = require("./classes/book.js");
const BookTypes = require("./classes/bookTypes.js");

var staticIndex = 0;

var bookList = [
  // Test only
  new Book(
    0,
    "Test title",
    "Jason",
    "Penguin Random House",
    new Date("05-15-2010"),
    13
  ),
  new Book(
    1,
    "Test titl 2",
    "Jason",
    "Hachette Livre",
    new Date("08-02-2012"),
    22
  ),
  new Book(
    2,
    "New book 3",
    "Tetty",
    "Hachette Livre",
    new Date("08-02-2012"),
    12
  )
];

staticIndex = bookList.length + 1;
module.exports.AllBooks = bookList;
module.exports.StaticIndex = staticIndex;

module.exports.AddBook = function (bookObj) {
  let duplicate = bookList.find((book) => book === bookObj);
  if (duplicate) {
    console.log("A duplicate book tried to get added");
    return false;
  } else {
    bookList.push(bookObj);
    staticIndex++;
    return true;
  }
};

module.exports.GetBook = function (val, attribute = "Id") {
  return bookList.find((book) => book[attribute] === val);
};

module.exports.DeleteBook = function (val, attribute = "Id") {
  //console.log("Removing a book from " + JSON.stringify(bookList));
  let l = bookList.length;
  for (let i = 0; i < l; i++) {
    if (bookList[i][attribute] === val) {
      bookList.splice(i, 1);
      break;
    }
  }
  //console.log("Resulted list: " + JSON.stringify(bookList));
  return bookList.length !== l;
};

module.exports.UpdateBook = function (
  querryValue,
  newValue,
  valueAttribute = "Title",
  querryAttribute = "Id"
) {
  let bookToUpdate = this.GetBook(querryValue, querryAttribute);
  if (bookToUpdate) {
    bookToUpdate[valueAttribute] = newValue;
  } else {
    return false;
  }
  console.log("Resulted list: " + JSON.stringify(bookList));
  return true;
};
