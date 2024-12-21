const body = document.querySelector("body");
const filtersIcon = document.getElementById("filters");
const themeToggler = document.getElementById("theme_toggler");
const form = document.querySelector("form");
const addBookBtn = document.getElementById("add_book_btn");
const overlay = document.getElementById("overlay");
const gridWrapper = document.getElementById("grid_wrapper");
const submitNewBookBtn = document.getElementById("submit_new_book");
const booksArr = [];
let booksCounter = 1;

function Book(id, title, author, pages, markAsRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.markAsRead = markAsRead;
}

const bookCard = (id, title, author, pages, markAsRead) => {
  return `
        <div class="book_card" data-id="${id}">
          <p class="book_title">${title}</p>
          <p class="author">${author}</p>
          <p class="pages">Pages: ${pages}</p>
          <div class="toggler_container">
            <label> Mark as read</label>
            <div class="toggle_switch">
              ${
                markAsRead
                  ? `<div class="circle active"></div>`
                  : `<div class="circle"></div>`
              }
            </div>
          </div>
          <button class="remove_book">Delete</button>
        </div>
    `;
};

addBookBtn.onclick = () => {
  form.classList.toggle("active");
  overlay.classList.toggle("active");
};
gridWrapper.addEventListener("click", (event) => {
  const toggle = event.target.closest(".toggle_switch");
  if (toggle) {
    const circle = toggle.querySelector(".circle");
    circle.classList.toggle("active");
  }
});
gridWrapper.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".remove_book");
  if (removeBtn) {
    const bookCard = removeBtn.closest(".book_card");
    const bookId = Number(bookCard.dataset.id);
    booksArr.splice(
      booksArr.findIndex((book) => book.id === bookId),
      1
    );
    bookCard.remove();
  }
});
const setColorScheme = () => {
  const currentTheme = body.getAttribute("data-theme");
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "light");
    themeToggler.setAttribute("src", "./assets/light-mode.svg");
  } else {
    body.setAttribute("data-theme", "dark");
    themeToggler.setAttribute("src", "./assets/dark-mode.svg");
  }
};
themeToggler.onclick = () => setColorScheme();

const createNewBook = () => {
  const newInputTitle = document.getElementById("input_book_title");
  const newInputAuthor = document.getElementById("input_book_author");
  const newInputPages = document.getElementById("input_book_pages");
  const newInputMarkAsRead = document.getElementById("input_mark_as_read");

  const titleValue = newInputTitle.value;
  const authorValue = newInputAuthor.value;
  const pagesValue = newInputPages.value;
  const markAsReadValue = newInputMarkAsRead.checked;

  if (titleValue && authorValue && pagesValue) {
    booksArr.push(
      new Book(
        booksCounter++,
        titleValue,
        authorValue,
        pagesValue,
        markAsReadValue
      )
    );
    newInputTitle.value = "";
    newInputAuthor.value = "";
    newInputPages.value = "";
    newInputMarkAsRead.checked = false;
    form.classList.remove("active");
    overlay.classList.remove("active");
    if (form.classList.contains("form_error")) {
      form.classList.remove("form_error");
    }
  } else {
    form.classList.add("form_error");
  }
};
const renderBooks = () => {
  gridWrapper.innerHTML = "";
  booksArr.forEach((book) => {
    gridWrapper.innerHTML += bookCard(
      book.title,
      book.author,
      book.pages,
      book.markAsRead
    );
  });
};
submitNewBookBtn.addEventListener("click", (event) => {
  event.preventDefault();
  createNewBook();
  renderBooks();
});
overlay.addEventListener("click", () => {
  form.classList.remove("form_error");
  form.classList.remove("active");
  overlay.classList.remove("active");
});
