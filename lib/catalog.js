// The store's products. An item on promotion carries `salePrice` in place of
// `price` for as long as the promotion runs, and carries it back again when
// the promotion ends.
const CATALOG = {
  mug: { sku: "mug", price: { amount: 1200, currency: "usd" } },
  tee: { sku: "tee", price: { amount: 2500, currency: "usd" } },
  cap: { sku: "cap", salePrice: { amount: 900, currency: "usd" } },
};

function lineItem(sku, quantity) {
  return { ...CATALOG[sku], quantity };
}

module.exports = { CATALOG, lineItem };
