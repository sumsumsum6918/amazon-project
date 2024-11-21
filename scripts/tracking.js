import { updateHeaderQuantity } from "../data/cart.js";
import { getOrder } from "../data/order.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatDeliveryWeekday } from "../data/deliveryOptions.js";

loadPage();
async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProduct(productId);

  const productDetails = order.products.find(
    (product) => product.productId === productId
  );

  const orderTimeString = formatDeliveryWeekday(
    productDetails.estimatedDeliveryTime
  );

  let orderTrackingHTML = "";
  orderTrackingHTML = `
  <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${orderTimeString}</div>

        <div class="product-info">
         ${product.name}
        </div>

        <div class="product-info">Quantity: ${productDetails.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
  `;
  document.querySelector(".js-order-tracking").innerHTML = orderTrackingHTML;

  updateHeaderQuantity();
}
