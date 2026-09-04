const express = require("express");
const path = require("path");
const { calculateTotal } = require("./lib/total");
const { cartTotal } = require("./lib/cart");
const { lineItem } = require("./lib/catalog");

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

const port = process.env.PORT || 3300;
if (require.main === module) {
  app.listen(port, () => console.log(`snare-e2e-throwaway listening on ${port}`));
}

module.exports = app;
