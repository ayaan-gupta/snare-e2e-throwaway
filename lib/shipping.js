// Shipping is free once the order reaches the free-shipping threshold for the
// destination country, and a flat fee below it. Amounts are in cents.
const RATES = {
  us: { flatFee: 599, freeOver: 5000 },
  ca: { flatFee: 899, freeOver: 7500 },
};

function shippingCents(subtotalCents, country) {
  const rate = RATES[country];
  return subtotalCents >= rate.freeOver ? 0 : rate.flatFee;
}

module.exports = { RATES, shippingCents };
