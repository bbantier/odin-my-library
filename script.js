const myLibrary = [];

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

class Book {

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  markAsRead() {
    this.read = !this.read;
  }

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

  myLibrary.forEach((book, index) => {
    const bookRow = document.createElement("tr");
    bookRow.classList.add("book-row");
    bookRow.setAttribute("id", `book-${index}`);
    bookRow.innerHTML += `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read === true ? "yes" : "no"}</td>
      <td>
        <img alt="delete" class="delete-button" src="assets/icons/delete.svg">
        <img alt="mark as read" class="read-button" src="assets/icons/check.svg">
      </td>
    `;
    bookTable.appendChild(bookRow);
    allowDelete();
    allowMarkAsRead();
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
  const read = (readInput.checked ? true : false);

  addBookToLibrary(title, author, pages, read);
  updateUi();
  resetForm();
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

function allowDelete() {
  const deleteButton = document.querySelectorAll(".delete-button");
  deleteButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (confirm("Are your sure you want to remove that book?")) {
        const bookId = event.target.parentNode.parentNode
          .getAttribute("id")
          .slice(-1);
        myLibrary.splice(bookId, 1);
        updateUi();
      }
    });
  });
}

function allowMarkAsRead() {
  const readButton = document.querySelectorAll(".read-button");
  readButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      const bookId = event.target.parentNode.parentNode
        .getAttribute("id")
        .slice(-1);
      myLibrary[bookId].markAsRead();
      updateUi();
    })
  })
}

function resetForm() {
  const newBookForm = document.querySelector(".new-book-form");
  newBookForm.reset();
}