export interface InitOptions {
    projectId: string;
    apiKey: string;
    apiBase?: string;
}
/**
 * One-line install per PRD Section 1. `apiKey` is required even though
 * Section 1's abbreviated example doesn't show one — Section 4 mandates
 * auth on the ingestion endpoint, so an SDK that never sends a key could
 * never satisfy it (see docs/overnight-decisions-2026-07-09.md, item 3).
 */
export declare function init(options: InitOptions): void;
/** Manual capture per PRD Section 2, for a customer's own try/catch blocks. */
export declare function captureException(error: unknown): void;
//# sourceMappingURL=index.d.ts.map