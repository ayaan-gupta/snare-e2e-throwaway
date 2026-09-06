const express = require("express");
const path = require("path");
const { calculateTotal } = require("./lib/total");
const { cartTotal } = require("./lib/cart");
const { lineItem } = require("./lib/catalog");
const { applyDiscount } = require("./lib/discount");
const { shippingCents } = require("./lib/shipping");
const { taxCents } = require("./lib/tax");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/total", (req, res) => {
  const total = calculateTotal(req.query.items);
  res.json({ total });
});

app.get("/api/cart-total", (req, res) => {
  const skus = String(req.query.skus || "").split(",").filter(Boolean);
  const items = skus.map((sku) => lineItem(sku, 1));
  res.json({ total: cartTotal(items) });
});

app.get("/api/checkout", (req, res) => {
  const skus = String(req.query.skus || "").split(",").filter(Boolean);
  const items = skus.map((sku) => lineItem(sku, 1));
  const subtotal = cartTotal(items);
  res.json({ total: applyDiscount(subtotal, req.query.code) });
});

app.get("/api/shipping", (req, res) => {
  const subtotal = Number(req.query.subtotal || 0);
  res.json({ shipping: shippingCents(subtotal, String(req.query.country || "us")) });
});

app.get("/api/tax", (req, res) => {
  const subtotal = Number(req.query.subtotal || 0);
  res.json({ tax: taxCents(subtotal, String(req.query.region || "us")) });
});

const port = process.env.PORT || 3300;
if (require.main === module) {
  app.listen(port, () => console.log(`snare-e2e-throwaway listening on ${port}`));
}

module.exports = app;
