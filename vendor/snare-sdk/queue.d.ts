import type { CapturedEvent } from "./capture.js";
export interface EventQueueOptions {
    flushSize: number;
    flushIntervalMs: number;
    onFlush: (events: CapturedEvent[]) => void;
}
export interface EventQueue {
    enqueue(event: CapturedEvent): void;
    /** Forces a flush now (calls onFlush) if anything is queued. Used by manual/explicit flush paths. */
    flush(): void;
    /** Clears the queue and cancels the pending timer WITHOUT calling onFlush — the caller (index.ts's unload handler) delivers the drained events itself via sendBeacon. */
    drain(): CapturedEvent[];
}
/**
 * PRD Section 3's three flush conditions:
 *   - 5 events queued
 *   - 10 seconds elapsed since the OLDEST queued event (not since the last
 *     flush) — the timer is armed exactly once, when the queue transitions
 *     from empty to non-empty, and cleared whenever the queue empties out.
 *   - page unload (handled by the caller via drain(), not this module —
 *     sendBeacon delivery is a browser-global concern, kept out of this
 *     pure queue logic so it stays unit-testable without a DOM).
 */
export declare function createEventQueue(opts: EventQueueOptions): EventQueue;
//# sourceMappingURL=queue.d.ts.map