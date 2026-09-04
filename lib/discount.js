// Promo codes. Stored uppercase; a shopper may type them in any case.
const CODES = {
  WELCOME10: { percentOff: 10 },
  SUMMER25: { percentOff: 25 },
};

// Applies a promo code to a total in cents.
// Returns totalCents unchanged when the code isn't recognized rather than throwing.
function applyDiscount(totalCents, code) {
  const rule = CODES[String(code).toUpperCase()];
  if (!rule) {
    return totalCents;
  }
  return Math.round(totalCents * (1 - rule.percentOff / 100));
}

module.exports = { CODES, applyDiscount };
