const myLibrary = [];

function Book(title, author, pages, read, desc, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.desc = desc;
  this.cover = cover;
  this.id = crypto.randomUUID();
}

function saveLibrary() {
  localStorage.setItem(
    "myLibrary",
    JSON.stringify(myLibrary)
  );
}

function loadLibrary() {

  myLibrary.length = 0;

  addBookToLibrary(
    "Houseki no Kuni",
    "Haruko Ichikawa",
    323,
    true,
    "Houseki no Kuni Volume 4",
    "/assets/cover1.jpg"
  );

  addBookToLibrary(
    "Houseki no Kuni",
    "Haruko Ichikawa",
    295,
    false,
    "Houseki no Kuni Volume 7",
    "/assets/cover2.jpg"
  );
}

function addBookToLibrary(
  title,
  author,
  pages,
  read,
  desc,
  cover
) {

  const book = new Book(
    title,
    author,
    pages,
    read,
    desc,
    cover
  );

  myLibrary.push(book);

  saveLibrary();

  displayBooks();
}

const cards = document.getElementById("cards");
const dialog = document.getElementById("bookDialog");
const addBookBtn = document.getElementById("addBookBtn");
const closeBtn = document.getElementById("closeBtn");
const form = document.getElementById("bookForm");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const desc = document.getElementById("desc").value;
  const read = document.getElementById("read").checked;

  const fileInput = document.getElementById("cover");

  const file = fileInput.files[0];

  const reader = new FileReader();

  reader.onload = function () {

    addBookToLibrary(
      title,
      author,
      pages,
      read,
      desc,
      reader.result
    );

    form.reset();

    dialog.close();
  };

  reader.readAsDataURL(file);
});

function displayBooks() {

  const oldCards = document.querySelectorAll(".book-card");

  oldCards.forEach(card => card.remove());

  myLibrary.forEach(book => {

    const card = document.createElement("div");

    card.classList.add("card", "book-card");

    card.innerHTML = `
      <img src="${book.cover}">

      <div class="card-content">

        <h2>${book.title}</h2>

        <h3>${book.author}</h3>

        <div class="buttons">

          <button class="${book.read ? "read" : "not-read"}">
            ${book.read ? "Read" : "Not Read"}
          </button>

          <button class="delete">
            Delete
          </button>

        </div>

      </div>
    `;

    const deleteBtn = card.querySelector(".delete");

    deleteBtn.addEventListener("click", (e) => {

      e.stopPropagation();

      const index = myLibrary.findIndex(
        item => item.id === book.id
      );

      myLibrary.splice(index, 1);

      saveLibrary();

      displayBooks();
    });

    const readBtn = card.querySelector(".read, .not-read");

    readBtn.addEventListener("click", (e) => {

      e.stopPropagation();

      book.read = !book.read;

      saveLibrary();

      displayBooks();
    });

    card.addEventListener("click", () => {
      showBookDetails(book);
    });

    cards.appendChild(card);
  });
}

function showBookDetails(book) {

  const detailDialog = document.createElement("dialog");

  detailDialog.classList.add("detail-dialog");

  detailDialog.innerHTML = `
    <div class="detail-content">

      <img src="${book.cover}">

      <div class="detail-text">

        <h2>${book.title}</h2>

        <h3>${book.author}</h3>

        <p><strong>Pages:</strong> ${book.pages}</p>

        <p>
          <strong>Status:</strong>
          ${book.read ? "Read" : "Not Read"}
        </p>

        <p class="description">
          ${book.desc}
        </p>

        <button class="close-detail">
          Close
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(detailDialog);

  detailDialog.showModal();

  detailDialog
    .querySelector(".close-detail")
    .addEventListener("click", () => {

      detailDialog.close();

      detailDialog.remove();
    });
}

loadLibrary();

displayBooks();