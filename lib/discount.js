// Promo codes. Stored uppercase; a shopper may type them in any case.
const CODES = {
  WELCOME10: { percentOff: 10 },
  SUMMER25: { percentOff: 25 },
};

// Applies a promo code to a total in cents.
function applyDiscount(totalCents, code) {
  const rule = CODES[String(code).toUpperCase()];
  return Math.round(totalCents * (1 - rule.percentOff / 100));
}

module.exports = { CODES, applyDiscount };
