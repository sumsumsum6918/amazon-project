//create data structure with arrays and objects
//loading products details from the products data file

import { cart, addToCart, calculateCartQuantity } from "../data/cart.js"; //rename variable with cart as myCart
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
//or import everything from a file, import * as cartModule from "../";
//and access with cartModule.cart and cartModule.addToCart('id')

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatCurrency(
            product.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button 
          class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}" 
          >Add to Cart</button>
        </div>
`;
});
//data attribute uses kebab case: data-product-name-name-name-or-more;
//must starts with data-

document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

updateCartQuantity();

const addedMessageTimeouts = {};

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    //finds the data that saved in the data- *uses camal case
    const { productId } = button.dataset; //deconstructing

    addToCart(productId);

    updateCartQuantity();

    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedMessage.classList.add("added-to-cart-visible");

    const previousTimoutId = addedMessageTimeouts[productId];

    if (previousTimoutId) {
      clearTimeout(previousTimoutId);
    }
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);

    addedMessageTimeouts[productId] = timeoutId;
  });
});
