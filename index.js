const state = {
  items: [
    { id: "001-beetroot", name: "beetroot", price: 0.35, type: "vegetable" },
    { id: "002-carrot", name: "carrot", price: 0.35, type: "vegetable" },
    { id: "003-apple", name: "apple", price: 0.35, type: "fruit" },
    { id: "004-apricot", name: "apricot", price: 0.35, type: "fruit" },
    { id: "005-avocado", name: "avocado", price: 0.35, type: "fruit" },
    { id: "006-bananas", name: "bananas", price: 0.35, type: "fruit" },
    { id: "007-bell-pepper", name: "bell pepper", price: 0.35, type: "vegetable" },
    { id: "008-berry", name: "berry", price: 0.35, type: "fruit" },
    { id: "009-blueberry", name: "blueberry", price: 0.35, type: "fruit" },
    { id: "010-eggplant", name: "eggplant", price: 0.35, type: "vegetable" }
  ],
  cart: [],
  currentFilter: 'all' 
};

function showItems() {
  const itemlist = document.querySelector(".store--item-list");
  itemlist.innerHTML = "";

  
  const filteredItems = state.currentFilter === 'all'
    ? state.items
    : state.items.filter(item => item.type === state.currentFilter);

  filteredItems.forEach(shopItem => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div class="store--item-icon">
        <img src="assets/icons/${shopItem.id}.svg" alt="${shopItem.name}">
      </div>
      <button class="AddToCart">Add to cart</button>
    `;

    const addButton = item.querySelector(".AddToCart");

    addButton.addEventListener("click", () => {
      addToCart(shopItem);
    });

    itemlist.appendChild(item);
  });
}

function addToCart(item) {
  const itemInCart = state.cart.find(x => x.id == item.id);

  if (itemInCart) {
    itemInCart.quantity++;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  showCart();
}

function showCart() {
  const cartList = document.querySelector(".cart--item-list");
  cartList.innerHTML = "";

  state.cart.forEach(cartItem => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div class="cart--item-icon">
        <img src="assets/icons/${cartItem.id}.svg" alt="${cartItem.name}">
      </div>
      <p>${cartItem.name}</p>
      <button class="quantity-btn remove-btn center">-</button>
      <span class="quantity-text center">${cartItem.quantity}</span>
      <button class="quantity-btn add-btn center">+</button>
    `;

    item.querySelector(".remove-btn").addEventListener("click", () => {
      changeQuantity(cartItem.id, -1);
    });

    item.querySelector(".add-btn").addEventListener("click", () => {
      changeQuantity(cartItem.id, 1);
    });

    cartList.appendChild(item);
  });
  calculateTotal()
}

function changeQuantity(itemId, change) {
  const itemInCart = state.cart.find(x => x.id === itemId);

  if (itemInCart) {
    itemInCart.quantity += change;

    if (itemInCart.quantity <= 0) {
      state.cart = state.cart.filter(x => x.id !== itemId);
    }

    showCart();
    calculateTotal();
  }
}

function calculateTotal() {
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.querySelector(".total-number").textContent = `£${total.toFixed(2)}`;
}

function addFilterEventListeners() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Set the current filter based on the button clicked
      state.currentFilter = button.getAttribute('data-type');
      showItems(); // Re-render the items based on the new filter
    });
  });
}

showItems(); // Show all items by default
showCart();  // Show initial cart (empty)
addFilterEventListeners(); 
