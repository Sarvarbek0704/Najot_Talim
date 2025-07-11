// script.js

const api = axios.create({
  baseURL: "https://686f438d91e85fac42a04644.mockapi.io",
});

const box = document.querySelector(".prods");
const title = document.querySelector(".title");
const price = document.querySelector(".price");
const image = document.querySelector(".image");
const btn = document.querySelector(".btn");
const ratingStars = document.querySelectorAll(".rate-star");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".close");
let selectedRating = 0;

function Yulduzcha(rating) {
  let yulduz = "";
  for (let i = 1; i <= 5; i++) {
    yulduz += `<span class="star ${i > rating ? "inactive" : ""}">?</span>`;
  }
  return yulduz;
}

function showData(arr) {
  box.innerHTML = "";
  arr.forEach((x) => {
    box.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card" data-id="${x.id}" data-title="${x.title}" data-image="${x.image}" data-price="${x.price}" data-rating="${x.rating}">
        <img src="${x.image}" alt="${x.title}" />
        <h1>${x.title}</h1>
        <p class="desc">Lorem ipsum dolor sit amet.</p>
        <p class="price">$${parseFloat(x.price).toFixed(2)}</p>
        <div class="stars">${Yulduzcha(x.rating)}</div>
        <button class="buy-btn">Buy Now</button>
        <button class="delete-btn">O'chirish</button>
      </div>
    `
    );
  });
}

async function getData() {
  const { data } = await api.get("/products");
  showData(data);
}
getData();

async function createData(obj) {
  await api.post("/products", obj);
  getData();
}

btn.addEventListener("click", () => {
  const user = {
    title: title.value.trim(),
    price: price.value,
    image: image.value,
    rating: selectedRating || 0,
  };

  if (!user.title || !user.image || !user.price || !user.rating) {
    alert("Iltimos, barcha maydonlarni toldiring.");
    return;
  }

  createData(user);
  title.value = "";
  price.value = "";
  image.value = "";
  selectedRating = 0;
  ratingStars.forEach((s) => s.classList.remove("selected"));
});

// Interaktiv yulduz tanlash
ratingStars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = +star.dataset.val;
    ratingStars.forEach((s) => {
      s.classList.toggle("selected", +s.dataset.val <= selectedRating);
    });
  });
});

// Delete & Modal
box.addEventListener("click", async (e) => {
  const card = e.target.closest(".card");
  const id = card?.dataset.id;

  if (e.target.classList.contains("delete-btn")) {
    if (confirm("O'chirasizmi?")) {
      await api.delete(`/products/${id}`);
      getData();
    }
  }

  if (e.target.classList.contains("buy-btn")) {
    const { title, image, price, rating } = card.dataset;
    modalBody.innerHTML = `
      <img src="${image}" alt="${title}" />
      <h2>${title}</h2>
      <p>Narxi: $${price}</p>
      <div class="stars">${Yulduzcha(rating)}</div>
    `;
    modal.style.display = "flex";
  }
});

// Modal yopish
closeModal.addEventListener("click", () => (modal.style.display = "none"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.style.display = "none";
});

// Dark mode toggle
const toggleDark = document.getElementById("toggle-dark");
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
