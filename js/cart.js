document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("logged-in"))?.username;
  const cartContainer = document.querySelector(".cart-container");
  const cartItemContainer = document.querySelector("#cart-items-container");
  const totalItems = document.querySelector("#total-items");
  const totalPrice = document.querySelector("#total-price");
  const usernameLabel = document.querySelector("#cart-username");

  if (!loggedInUser) {
    cartContainer.innerHTML = `
      <h1 class='font-rokh'>ابتدا وارد حساب خود شوید</h1>
      <a href="login.html" class="back-btn font-rokh">ورود</a>
    `;
    return;
  }

  usernameLabel.textContent = `کاربر: ${loggedInUser}`;

  const cart = JSON.parse(localStorage.getItem(loggedInUser))?.cart || [];

  if (cart.length === 0) {
    cartItemContainer.innerHTML = `<p class="empty-p font-rokh">سبد خرید شما خالی است 🛒</p>`;
    return;
  }

  let total = 0;

  cart.forEach(({ name, price, id, mainImage }) => {
    total += price;
    cartItemContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="shopping-card" onclick="openProduct('${id}')">
        <img src="${mainImage}" alt="${name}">
        <div class="title">${name}</div>
        <div class="buttons">
          <span class="price">${price.toLocaleString()} تومان</span>
          <button onclick="event.stopPropagation(), deleteItem(${id})" class="deletItem font-rokh">حذف</button>
        </div>
      </div>
      `
    );
  });

  totalItems.textContent = `تعداد کالاها: ${cart.length}`;
  totalPrice.textContent = `مجموع کل: ${total.toLocaleString()} تومان`;
});

function deleteItem(id) {
  const username = JSON.parse(localStorage.getItem("logged-in"))?.username;

  if (!username) {
    console.error("کاربر وارد نشده!");
    return;
  }

  let userData = JSON.parse(localStorage.getItem(username)) || { cart: [] };

  if (!Array.isArray(userData.cart)) {
    userData.cart = [];
  }

  userData.cart = userData.cart.filter(item => item.id != id);

  localStorage.setItem(username, JSON.stringify(userData));

  location.reload();
}


function openProduct(id){
        window.location.href = `product.html?id=${id}`;
    }
