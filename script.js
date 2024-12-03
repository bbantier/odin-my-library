const myLibrary = [];
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

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
  const bookTable = document.querySelector(".book-list");
  const bookRows = document.querySelectorAll(".book-row");

  bookRows.forEach((element) => {
    element.remove();
  });

  myLibrary.forEach((book) => {
    const bookRow = document.createElement("tr");
    bookRow.classList.add("book-row");
    bookRow.innerHTML += `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read === true ? "yes" : "no"}</td>
    `;
    bookTable.appendChild(bookRow);
  });
}

document.addEventListener("DOMContentLoaded", () => updateUi());

const newBookButton = document.querySelector("#new-book-button");
const newBookModal = document.querySelector("#new-book-modal");
const addButton = document.querySelector("#add-button");
const cancelButton = document.querySelector("#cancel-button");

newBookButton.addEventListener("click", () => {
  newBookModal.style.display = "block";
});

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = Number(pagesInput.value);
  const read = (readInput.value = "on" ? true : false);

  addBookToLibrary(title, author, pages, read);
  updateUi();

  newBookModal.style.display = "none";
});

cancelButton.addEventListener("click", () => {
  newBookModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === newBookModal) {
    newBookModal.style.display = "none";
  }
});
