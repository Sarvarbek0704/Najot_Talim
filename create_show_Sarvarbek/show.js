const api = axios.create({
  baseURL: "https://686f438d91e85fac42a04644.mockapi.io",
});

let info = document.querySelector(".info");

let id = localStorage.getItem("active");

function paintUi(data) {
  info.insertAdjacentHTML(
    "beforeend",
    `
    <div class="info">
    <img src=${data.image} alt="" />
    <h1>${data.title}</h1>
    <p>${data.phone}</p>
    <p>${data.price}</p>
    <button class="buy">buy</button>
    </div>
    `
  );
}

async function showData() {
  let { data } = await api.get(`/products/${id}`);
  paintUi(data);
}

showData();

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy")) {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!cart.includes(id)) {
      cart.push(id);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      alert("Savatga qo‘shildi");
    } else {
      alert("Savatda bor ekan");
    }
  }
});
