export interface CapturedEvent {
    message: string;
    stack?: string;
    timestamp: number;
    url: string;
    userAgent: string;
    consoleLog: string | null;
}
export interface ErrorCaptureInput {
    error: unknown;
    now: number;
    url: string;
    userAgent: string;
    consoleLog: string | null;
}
/**
 * Builds a CapturedEvent from any thrown/rejected value plus the ambient
 * context (timestamp, URL, user agent, console ring buffer snapshot) the
 * real call sites in index.ts supply from live browser globals. Kept pure
 * (no `window`/`navigator`/`Date.now()` reads inside) so it's testable
 * without a DOM — mirrors packages/widget/src/capture.ts's captureEnvironment.
 */
export declare function buildCapturedEvent(input: ErrorCaptureInput): CapturedEvent;
//# sourceMappingURL=capture.d.ts.map