
const api = axios.create({
  baseURL: "https://686f5abe91e85fac42a0a104.mockapi.io",
});

const box = document.querySelector(".prods");
const modal = document.querySelector(".modal");
const deleteBtn = document.querySelector(".delete-btn");
const closeBtn = document.querySelector(".close-btn");

let selectedId = null;
let selectedLocalIndex = null;
function showData(apiUsers = [], localUsers = []) {
  box.innerHTML = "";

  apiUsers.forEach(e => {
    box.insertAdjacentHTML("beforeend", `
      <div class="card" data-id="${e.id}">
        <img src="${e.avatar}" alt="Rasm" />
        <h1>${e.name}</h1>
        <p>Email: ${e.email}</p>
        <b>Password:*******</b>
        <u>API</u>
      </div>
    `);
  });

  localUsers.forEach((user, index) => {
    box.insertAdjacentHTML("beforeend", `
      <div class="card" data-local="${index}">
        <img src="./user.png" alt="Rasm" />
        <h1>${user.name}</h1>
        <p>Email: ${user.email}</p>
        <b>Password: ********</b>
        <u>LOCAL</u>
      </div>
    `);
  });
}

async function getData() {
  try {
    const { data: apiUsers } = await api.get("/users");
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    showData(apiUsers, localUsers);
  } catch (err) {
    box.innerHTML = "<p>Xatolik yuz berdi. Qayta urinib koring.</p>";
    console.error(err);
  }
}

box.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  selectedId = card.dataset.id || null;
  selectedLocalIndex = card.dataset.local || null;

  if (selectedId || selectedLocalIndex !== null) {
    modal.classList.remove("hidden");
  }
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  selectedId = null;
  selectedLocalIndex = null;
});

deleteBtn.addEventListener("click", async () => {
  try {
    if (selectedId) {
      await api.delete(`/users/${selectedId}`);
    } else if (selectedLocalIndex !== null) {
      const localUsers = JSON.parse(localStorage.getItem("users")) || [];
      localUsers.splice(selectedLocalIndex, 1);
      localStorage.setItem("users", JSON.stringify(localUsers));
    }

    modal.classList.add("hidden");
    selectedId = null;
    selectedLocalIndex = null;
    getData();
  } catch (err) {
    console.error("O?chirishda xatolik:", err);
  }
});

window.addEventListener("DOMContentLoaded", getData);
