const MAX_ENTRIES = 50;
const LEVELS = ["log", "warn", "error"];
function stringifyArg(arg) {
    if (typeof arg === "string")
        return arg;
    try {
        return JSON.stringify(arg);
    }
    catch {
        return String(arg);
    }
}
/**
 * Wraps console.log/warn/error to buffer the last MAX_ENTRIES calls (oldest
 * evicted first), always forwarding to the original method afterward so the
 * host page's own console usage is never suppressed. Must be called at
 * module load time (not on first error) — console output before that point
 * can't be captured retroactively. Every buffering operation is wrapped in
 * try/catch so a bug here can never break the host app's real console call.
 *
 * Identical in behavior to packages/widget/src/console-buffer.ts by design
 * (Telemetry SDK PRD, Section 2: "reusing the same pattern... don't
 * reimplement it differently") — kept as a separate file rather than a
 * shared package because the SDK and widget are independently distributed
 * bundles with different build pipelines.
 */
export function startConsoleCapture(targetConsole = console) {
    const buffer = [];
    for (const level of LEVELS) {
        const original = targetConsole[level].bind(targetConsole);
        targetConsole[level] = (...args) => {
            try {
                buffer.push({ level, args: args.map(stringifyArg), timestamp: Date.now() });
                if (buffer.length > MAX_ENTRIES) {
                    buffer.shift();
                }
            }
            catch {
                // Buffering must never prevent the real console call below.
            }
            original(...args);
        };
    }
    return {
        getBuffer() {
            return [...buffer];
        },
    };
}
//# sourceMappingURL=console-buffer.js.map