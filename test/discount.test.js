const test = require("node:test");
const assert = require("node:assert/strict");
const { applyDiscount } = require("../lib/discount");

test("applyDiscount takes the code's percentage off the total", () => {
  assert.equal(applyDiscount(1000, "WELCOME10"), 900);
});

test("applyDiscount accepts a code typed in lower case", () => {
  assert.equal(applyDiscount(1000, "summer25"), 750);
});
