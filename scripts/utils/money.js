export function formatCurrency(priceCents) {
  //to show 2 decimals
  return (priceCents / 100).toFixed(2);
}

export default formatCurrency;
