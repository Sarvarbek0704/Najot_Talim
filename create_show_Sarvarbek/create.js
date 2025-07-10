const api = axios.create({
  baseURL: "https://686f438d91e85fac42a04644.mockapi.io",
});

//box of products
let box = document.querySelector(".prods");

// from inputs
let title = document.querySelector(".title");
let phone = document.querySelector(".phone");
let price = document.querySelector(".price");
let image = document.querySelector(".image");
let btn = document.querySelector(".btn");

box.addEventListener("click", (e) => {
  let cur = e.target;
  let card = cur.closest(".card");
  if (card) {
    let id = card.firstElementChild.textContent;
    localStorage.setItem("active", id);
    window.location.assign("malumot.html");
  }
});
// show data to front
function showData(arr) {
  box.textContent = "";
  arr.forEach((e) => {
    box.insertAdjacentHTML(
      "beforeend",
      `
    <div class="card">
        <p>${e.id}</p>
        <img src=${e.image} alt="" />
        <h1>${e.title}</h1>
        <p>${e.phone}</p>
        <p>${e.price}</p>
        <button class="buy">buy</button>
    </div>
        `
    );
  });
}
// get data from back
async function getData() {
  let { data } = await api.get("/products");
  showData(data);
}

getData();

async function createData(malumot) {
  let { data } = await api.post("/products", malumot);
  getData();
}

btn.addEventListener("click", (e) => {
  let user = {
    title: title.value,
    phone: phone.value,
    price: price.value,
    image: image.value,
  };
  createData(user);
  title.value = "";
  phone.value = "";
  price.value = "";
  image.value = "";
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy")) {
    let id = localStorage.getItem("active");
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!cart.includes(id)) {
      cart.push(id);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      alert("Savatga qo‘shildi");
    }
  }
});
