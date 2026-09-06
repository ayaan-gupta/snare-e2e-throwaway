// Sales tax by region, in basis points of the subtotal. A region's entry is
// looked up by the two-letter code the storefront sends.
const TAX_RATES = {
  us: { bps: 725, label: "US sales tax" },
  ca: { bps: 1300, label: "HST" },
};

function taxCents(subtotalCents, region) {
  const rate = TAX_RATES[region];
  return Math.round((subtotalCents * rate.bps) / 10000);
}

module.exports = { TAX_RATES, taxCents };
