import { orders } from "../data/order.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatDeliveryDate } from "../data/deliveryOptions.js";
import { formatCurrency } from "./utils/money.js";
import { buyAgain, updateHeaderQuantity } from "../data/cart.js";

async function renderPlacedOrder() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log("Unexpected error. Please try again later.");
  }

  console.log(orders);
  let orderHeaderHTML = "";

  orders.forEach((order) => {
    const orderTimeString = formatDeliveryDate(order.orderTime);

    orderHeaderHTML += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderTimeString}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${productsListHTML(order)}
          </div>
        </div>
`;
    document.querySelector(".js-orders-grid").innerHTML = orderHeaderHTML;

    document.querySelectorAll(".js-buy-again-button").forEach((button) => {
      button.addEventListener("click", () => {
        const { productId } = button.dataset;

        const quantityElement = document.querySelector(
          `.js-product-quantity-${productId}`
        ).innerText;

        const quantity = Number(quantityElement.split(" ")[1]);

        buyAgain(productId, quantity);

        updateHeaderQuantity();

        button.innerHTML = "Added";
        setTimeout(() => {
          button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
        }, 1000);
      });
    });
  });
}
renderPlacedOrder();
updateHeaderQuantity();

function productsListHTML(order) {
  let orderDetailsHTML = "";

  order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);

    const dateString = formatDeliveryDate(productDetails.estimatedDeliveryTime);

    orderDetailsHTML += `
          <div class="product-image-container">
            <img
              src=${product.image}
            />
          </div>

          <div class="product-details">
            <div class="product-name">${product.name}</div>
            <div class="product-delivery-date">Arriving on: ${dateString} </div>
            <div class="product-quantity js-product-quantity-${productDetails.productId}">Quantity: ${productDetails.quantity}</div>
            <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productDetails.productId}">
              <img class="buy-again-icon" src="images/icons/buy-again.png" />
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${productDetails.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
`;
  });

  return orderDetailsHTML;
}
