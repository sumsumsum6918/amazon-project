import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}
export function resetCart() {
  if (cart) {
    cart = [];
  }
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function buyAgain(productId, quantity) {
  const matchingItem = cart.find(
    (cartItem) => cartItem.productId === productId
  );

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) {
    return;
  }

  if (!validDeliveryOption(deliveryOptionId)) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  renderCheckoutHeader();
}

export function saveQuantity(link) {
  const { productId } = link.dataset;

  const quantityInput = document.querySelector(
    `.js-quantity-input-${productId}`
  );
  const newQuantity = Number(quantityInput.value);

  if (newQuantity < 0 || newQuantity >= 1000) {
    alert("Quantity must be at least 0 and less than 1000");
  }

  updateQuantity(productId, newQuantity);

  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );
  container.classList.remove("is-editing-quantity");

  const quantityLabel = document.querySelector(
    `.js-quantity-label-${productId}`
  );

  quantityLabel.innerHTML = newQuantity;

  updateCartQuantity();
}

export async function loadCartFetch() {
  const response = await fetch("https://supersimplebackend.dev/cart");
  const text = await response.text();
  console.log(text);
  return text;
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(xhr.response);

    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
