/**
 * Sends a batch to /telemetry/:projectId/events. The API key rides in the
 * JSON body (never a header) because navigator.sendBeacon — mandated for
 * the page-unload flush path (PRD Section 3) — cannot set custom headers;
 * keeping the key in the body means every flush path (5-event, 10-second,
 * unload) uses the exact same envelope and the exact same server-side
 * parsing, rather than two different auth schemes for two delivery methods.
 *
 * useBeacon=true is for the unload path: sendBeacon is used when available
 * since it's designed to reliably complete during page teardown where a
 * normal fetch may be aborted; `fetch(..., { keepalive: true })` is the
 * fallback both when sendBeacon is unavailable and when sendBeacon itself
 * fails to queue the request (e.g. payload over its size limit).
 */
export function sendBatch(apiBase, projectId, apiKey, events, useBeacon) {
    if (events.length === 0)
        return;
    const url = `${apiBase.replace(/\/$/, "")}/telemetry/${projectId}/events`;
    const body = JSON.stringify({ apiKey, events });
    if (useBeacon && typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([body], { type: "application/json" });
        const queued = navigator.sendBeacon(url, blob);
        if (queued)
            return;
    }
    fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body,
        keepalive: useBeacon,
    })
        .then((response) => {
        if (!response.ok) {
            console.error("[@getsnare/sdk] telemetry batch rejected", response.status);
        }
    })
        .catch(() => {
        // Best-effort delivery — a dropped telemetry batch must never surface as an error in the host app.
    });
}
//# sourceMappingURL=transport.js.map