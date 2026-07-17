import { startConsoleCapture } from "./console-buffer.js";
import { buildCapturedEvent } from "./capture.js";
import { createEventQueue } from "./queue.js";
import { sendBatch } from "./transport.js";
const DEFAULT_API_BASE = "https://intake.snare.dev";
const FLUSH_SIZE = 5;
const FLUSH_INTERVAL_MS = 10_000;
// Must stay in sync with services/intake/src/routes/telemetry.ts's
// capturedEventSchema (consoleLog.max(20_000)) — the server rejects the
// ENTIRE batch with a 400 if any single event's consoleLog exceeds this
// cap, and the SDK's transport never inspects the response status, so an
// un-truncated console log here means silently dropped error reports with
// zero signal. Same cross-file numeric contract as MESSAGE_MAX_LENGTH /
// STACK_MAX_LENGTH in capture.ts.
const CONSOLE_LOG_MAX_LENGTH = 20_000;
let queue = null;
let consoleCapture = null;
let currentOptions = null;
function formattedConsoleLog() {
    if (!consoleCapture)
        return null;
    const buffer = consoleCapture.getBuffer();
    if (buffer.length === 0)
        return null;
    const joined = buffer.map((entry) => `[${entry.level}] ${new Date(entry.timestamp).toISOString()} ${entry.args.join(" ")}`).join("\n");
    return joined.slice(0, CONSOLE_LOG_MAX_LENGTH);
}
/**
 * One-line install per PRD Section 1. `apiKey` is required even though
 * Section 1's abbreviated example doesn't show one — Section 4 mandates
 * auth on the ingestion endpoint, so an SDK that never sends a key could
 * never satisfy it (see docs/overnight-decisions-2026-07-09.md, item 3).
 */
export function init(options) {
    currentOptions = options;
    const apiBase = options.apiBase ?? DEFAULT_API_BASE;
    // Must start before any capture can happen — console output before this
    // call can't be captured retroactively (same rule as the widget).
    consoleCapture = startConsoleCapture();
    queue = createEventQueue({
        flushSize: FLUSH_SIZE,
        flushIntervalMs: FLUSH_INTERVAL_MS,
        onFlush: (events) => sendBatch(apiBase, options.projectId, options.apiKey, events, false),
    });
    window.addEventListener("error", (event) => {
        captureException(event.error ?? event.message);
    });
    window.addEventListener("unhandledrejection", (event) => {
        captureException(event.reason);
    });
    window.addEventListener("pagehide", () => {
        if (!queue)
            return;
        const remaining = queue.drain();
        if (remaining.length > 0) {
            sendBatch(apiBase, options.projectId, options.apiKey, remaining, true);
        }
    });
}
/** Manual capture per PRD Section 2, for a customer's own try/catch blocks. */
export function captureException(error) {
    if (!queue || !currentOptions) {
        console.error("[@getsnare/sdk] captureException called before init()");
        return;
    }
    queue.enqueue(buildCapturedEvent({
        error,
        now: Date.now(),
        url: location.href,
        userAgent: navigator.userAgent,
        consoleLog: formattedConsoleLog(),
    }));
}
//# sourceMappingURL=index.js.map