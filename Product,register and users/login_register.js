document.addEventListener('DOMContentLoaded', function () {
  const signUpBtn = document.querySelector('.register-form .btn-primary');

  signUpBtn.addEventListener('click', () => {
    const name = document.querySelector('input[placeholder="Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();
    const password = document.querySelector('input[placeholder="Password"]').value.trim();
    const confirm = document.querySelector('input[placeholder="Confirm password"]').value.trim();

    if (!name || !email || !password || !confirm) {
      alert('Barcha maydonlarni toldiring.');
      return;
    }

    if (password !== confirm) {
      alert('Parollar mos emas!');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === email);

    if (userExists) {
      alert("Bu foydalanuvchi allaqachon mavjud!");
      return;
    }

    users.push({ name, email });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Royxatdan otish muvaffaqiyatli!");
    window.location.href = "./user.html";
  });
});
