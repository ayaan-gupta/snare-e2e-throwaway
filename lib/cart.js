// Totals a cart. Every line item carries a quantity and a money object whose
// `amount` is in cents.
function cartTotal(items) {
  let total = 0;
  for (const item of items) {
    total += (item.salePrice || item.price).amount * item.quantity;
  }
  return total;
}

module.exports = { cartTotal };
