module.exports = class Book {
  constructor(Id, Title, Author, Publisher, DateOfPub, Price, Type) {
    this.Id = Id;
    this.Title = Title;
    this.Author = Author;
    this.Publisher = Publisher;
    this.DateOfPub = DateOfPub;
    this.Price = Price;
    this.Type = Type;
  }
};
