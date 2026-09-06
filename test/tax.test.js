const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { taxCents } = require("../lib/tax");
const app = require("../server");

test("us tax on a $32.00 subtotal", () => {
  assert.equal(taxCents(3200, "us"), 232);
});

test("ca tax on a $32.00 subtotal", () => {
  assert.equal(taxCents(3200, "ca"), 416);
});

test("unsupported region throws a descriptive error", () => {
  assert.throws(() => taxCents(3200, "eu"), {
    name: "Error",
    message: "Unsupported tax region: eu",
  });
});

test("/api/tax responds 400 with a JSON error for an unsupported region", async () => {
  const server = app.listen(0);
  try {
    const { port } = server.address();
    const body = await new Promise((resolve, reject) => {
      http
        .get(`http://127.0.0.1:${port}/api/tax?subtotal=3200&region=eu`, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve({ status: res.statusCode, data }));
        })
        .on("error", reject);
    });
    assert.equal(body.status, 400);
    assert.deepEqual(JSON.parse(body.data), { error: "Unsupported tax region: eu" });
  } finally {
    server.close();
  }
});
