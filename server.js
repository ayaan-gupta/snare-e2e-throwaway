const express = require("express");
const path = require("path");
const { calculateTotal } = require("./lib/total");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/total", (req, res) => {
  const total = calculateTotal(req.query.items);
  res.json({ total });
});

const port = process.env.PORT || 3300;
if (require.main === module) {
  app.listen(port, () => console.log(`snare-e2e-throwaway listening on ${port}`));
}

module.exports = app;
