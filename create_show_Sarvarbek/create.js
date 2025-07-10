const api = axios.create({
  baseURL: "https://686f438d91e85fac42a04644.mockapi.io",
});

let box = document.querySelector(".prods");
let title = document.querySelector(".title");
let price = document.querySelector(".price");
let image = document.querySelector(".image");
let rating = document.querySelector(".rating");
let btn = document.querySelector(".btn");

function Yulduzcha(rating) {
  let yulduz = "";
  for (let i = 1; i <= 5; i++) {
    yulduz += `<span class="star ${i > rating ? "inactive" : ""}">★</span>`;
  }
  return yulduz;
}

function showData(arr) {
  box.innerHTML = "";
  arr.forEach((x) => {
    box.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card" data-id="${x.id}">
        <img src="${x.image}" alt="${x.title}" />
        <h1>${x.title}</h1>
        <p class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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
  let { data } = await api.get("/products");
  showData(data);
}
getData();

async function createData(obj) {
  await api.post("/products", obj);
  getData();
}

btn.addEventListener("click", () => {
  let user = {
    title: title.value,
    price: price.value,
    image: image.value,
    rating: +rating.value || 0,
  };
  createData(user);
  title.value = "";
  price.value = "";
  image.value = "";
  rating.value = "";
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    let id = e.target.closest(".card").dataset.id;
    let confirmDelete = confirm("O'chirasizmi?");
    if (confirmDelete) {
      await api.delete(`/products/${id}`);
      getData();
    }
  }
});
