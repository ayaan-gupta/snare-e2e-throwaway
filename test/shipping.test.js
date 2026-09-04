const test = require("node:test");
const assert = require("node:assert/strict");
const { shippingCents } = require("../lib/shipping");

test("shipping is a flat fee below the free threshold", () => {
  assert.equal(shippingCents(2000, "us"), 599);
});

test("shipping is free at or above the threshold", () => {
  assert.equal(shippingCents(5000, "us"), 0);
});

test("shipping returns null for a country with no rate, instead of throwing", () => {
  assert.equal(shippingCents(3200, "gb"), null);
});
