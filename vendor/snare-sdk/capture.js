// Must stay in sync with services/intake/src/routes/telemetry.ts's
// capturedEventSchema (message.max(2000), stack.max(20_000)) — the server
// rejects the ENTIRE batch with a 400 if any single event exceeds these
// caps, and the SDK's transport never inspects the response status, so an
// un-truncated field here means silently dropped error reports with zero
// signal. Same cross-file numeric contract as the widget package's
// screenshot field max (services/intake/src/routes/widget.ts) and
// Fastify's bodyLimit (services/intake/src/index.ts).
const MESSAGE_MAX_LENGTH = 2000;
const STACK_MAX_LENGTH = 20_000;
function extractMessageAndStack(error) {
    if (error instanceof Error) {
        const result = {
            message: (error.message || error.name || "Error").slice(0, MESSAGE_MAX_LENGTH),
        };
        if (error.stack !== undefined)
            result.stack = error.stack.slice(0, STACK_MAX_LENGTH);
        return result;
    }
    if (typeof error === "string" && error.length > 0) {
        return { message: error.slice(0, MESSAGE_MAX_LENGTH) };
    }
    return { message: "Non-error value thrown" };
}
/**
 * Builds a CapturedEvent from any thrown/rejected value plus the ambient
 * context (timestamp, URL, user agent, console ring buffer snapshot) the
 * real call sites in index.ts supply from live browser globals. Kept pure
 * (no `window`/`navigator`/`Date.now()` reads inside) so it's testable
 * without a DOM — mirrors packages/widget/src/capture.ts's captureEnvironment.
 */
export function buildCapturedEvent(input) {
    const { message, stack } = extractMessageAndStack(input.error);
    const event = {
        message,
        timestamp: input.now,
        url: input.url,
        userAgent: input.userAgent,
        consoleLog: input.consoleLog,
    };
    if (stack !== undefined)
        event.stack = stack;
    return event;
}
//# sourceMappingURL=capture.js.map