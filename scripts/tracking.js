import { updateHeaderQuantity } from "../data/cart.js";
import { getOrder } from "../data/order.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatDeliveryWeekday } from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

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

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

  const percentProgess =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

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
          <div class="progress-label ${
            percentProgess < 50 ? "current-status" : ""
          }">Preparing</div>
          <div class="progress-label  ${
            percentProgess >= 50 && percentProgess < 100 ? "current-status" : ""
          }">Shipped</div>
          <div class="progress-label ${
            percentProgess >= 100 ? "current-status" : ""
          }">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgess}%"></div>
        </div>
  `;
  document.querySelector(".js-order-tracking").innerHTML = orderTrackingHTML;

  updateHeaderQuantity();
}
