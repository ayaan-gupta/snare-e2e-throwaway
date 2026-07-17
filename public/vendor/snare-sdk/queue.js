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
export function createEventQueue(opts) {
    let queue = [];
    let timer = null;
    function clearTimer() {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
    }
    function flush() {
        if (queue.length === 0)
            return;
        const batch = queue;
        queue = [];
        clearTimer();
        opts.onFlush(batch);
    }
    function enqueue(event) {
        queue.push(event);
        if (queue.length === 1) {
            timer = setTimeout(flush, opts.flushIntervalMs);
        }
        if (queue.length >= opts.flushSize) {
            flush();
        }
    }
    function drain() {
        const batch = queue;
        queue = [];
        clearTimer();
        return batch;
    }
    return { enqueue, flush, drain };
}
//# sourceMappingURL=queue.js.map