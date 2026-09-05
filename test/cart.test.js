const test = require("node:test");
const assert = require("node:assert/strict");
const { cartTotal } = require("../lib/cart");

test("cartTotal multiplies each item's price by its quantity", () => {
  const items = [
    { sku: "mug", quantity: 2, price: { amount: 1200, currency: "usd" } },
    { sku: "tee", quantity: 1, price: { amount: 2500, currency: "usd" } },
  ];
  assert.equal(cartTotal(items), 4900);
});

test("cartTotal uses sale price for promotional items", () => {
  const items = [
    { sku: "cap", quantity: 1, salePrice: { amount: 900, currency: "usd" } },
    { sku: "mug", quantity: 1, price: { amount: 1200, currency: "usd" } },
  ];
  assert.equal(cartTotal(items), 2100);
});

test("cartTotal is 0 for an empty cart", () => {
  assert.equal(cartTotal([]), 0);
});
