import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });
  return found;
}

export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs();

  let remainingDate = deliveryOption.deliveryDays;

  while (remainingDate > 0) {
    deliveryDate = deliveryDate.add(1, "days");

    if (!isWeekend(deliveryDate)) {
      remainingDate--;
    }
  }

  const dateString = deliveryDate.format("dddd, MMM D");

  return dateString;
}

function isWeekend(date) {
  const dayOfWeek = date.format("dddd");
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
}

export function formatDeliveryDate(deliveryDate) {
  const dateString = dayjs(deliveryDate).format("MMMM D");
  return dateString;
}

export function formatDeliveryWeekday(deliveryDate) {
  const dateString = dayjs(deliveryDate).format("dddd, MMM D");
  return dateString;
}
