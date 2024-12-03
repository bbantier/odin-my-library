const myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 295,
    read: true,
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function updateUi() {
  myLibrary.forEach((book) => {
    const bookTable = document.querySelector(".book-list");
    const bookRow = document.createElement("tr");
    bookRow.innerHTML += `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>
    `;
    bookTable.appendChild(bookRow);
  });
}

document.addEventListener("DOMContentLoaded", () => updateUi());

const newBookButton = document.querySelector("#new-book-button");

newBookButton.addEventListener("click", () => addBookToLibrary());