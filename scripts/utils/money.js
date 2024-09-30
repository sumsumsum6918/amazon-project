export function formatCurrency(priceCents) {
  //to show 2 decimals
  return (Math.round(priceCents) / 100).toFixed(2);
}

export default formatCurrency;
