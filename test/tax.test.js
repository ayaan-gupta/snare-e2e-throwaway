const test = require("node:test");
const assert = require("node:assert/strict");
const { taxCents } = require("../lib/tax");

test("us tax on a $32.00 subtotal", () => {
  assert.equal(taxCents(3200, "us"), 232);
});

test("ca tax on a $32.00 subtotal", () => {
  assert.equal(taxCents(3200, "ca"), 416);
});
