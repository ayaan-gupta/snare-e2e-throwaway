const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateTotal } = require("../lib/total");

test("calculateTotal sums a comma-separated list of numbers", () => {
  assert.equal(calculateTotal("1,2,3"), 6);
});

test("calculateTotal does not throw when the items param is missing", () => {
  assert.doesNotThrow(() => calculateTotal(undefined));
});

test("calculateTotal returns 0 when the items param is missing", () => {
  assert.equal(calculateTotal(undefined), 0);
});
