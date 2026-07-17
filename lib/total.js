// Adds up a comma-separated list of numbers, e.g. "1,2,3" -> 6.
function calculateTotal(itemsParam) {
  if (itemsParam === undefined || itemsParam === null) {
    return 0;
  }
  const items = itemsParam.split(",").map(Number);
  return items.reduce((sum, n) => sum + n, 0);
}

module.exports = { calculateTotal };
