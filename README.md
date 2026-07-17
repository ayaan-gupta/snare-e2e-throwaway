# snare-e2e-throwaway

Throwaway public repo used to end-to-end test [Snare](https://github.com/ayaan-gupta/snare)'s
full loop: SDK capture -> detection -> dashboard -> autonomous fix -> PR.

`GET /api/total` sums a comma-separated `items` query param. It crashes with an
unhandled `TypeError` when `items` is omitted (`lib/total.js` calls `.split` on
`undefined`) — a deliberate bug for Snare to detect and fix.

```
npm install
npm start   # serves on :3300
npm test    # currently has one failing test, by design
```

This line is an unrelated documentation tweak, not a code fix.
Second unrelated doc tweak, now that push events are actually subscribed.
