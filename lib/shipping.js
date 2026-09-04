// Shipping is free once the order reaches the free-shipping threshold for the
// destination country, and a flat fee below it. Amounts are in cents.
const RATES = {
  us: { flatFee: 599, freeOver: 5000 },
  ca: { flatFee: 899, freeOver: 7500 },
};

// Returns the shipping cost in cents for the given country, or `null` when
// the country has no entry in RATES (i.e. shipping there hasn't been priced).
// Callers must check for `null` rather than assume a rate always exists.
function shippingCents(subtotalCents, country) {
  const rate = RATES[country];
  if (!rate) {
    return null;
  }
  return subtotalCents >= rate.freeOver ? 0 : rate.flatFee;
}

module.exports = { RATES, shippingCents };
