import { saveToIDB, loadFromIDB, deleteFromIDB } from "./idb";

class GlobalStore {
  constructor() {
    this.store = {};
    this.subscribers = {};
    this.isReady = false;

    // Only call init() if we're in the browser
    this.readyPromise =
      typeof window !== "undefined" ? this.init() : Promise.resolve();
  }

  async init() {
    try {
      const entries = await loadFromIDB();
      const now = Date.now();

      for (const { key, value, expiresAt } of entries) {
        if (!expiresAt || expiresAt > now) {
          this.store[key] = value;
        } else {
          await deleteFromIDB(key); // Clean up expired values
        }
      }

      this.isReady = true;
    } catch (err) {
      console.warn("GlobalStore: Failed to initialize from IndexedDB", err);
    }
  }

  /**
   * Set a value in memory and notify all subscribers.
   */
  set(key, value) {
    this.store[key] = value;

    if (this.subscribers[key]) {
      for (const cb of this.subscribers[key]) {
        cb(value);
      }
    }
  }

  /**
   * Get a value from memory.
   */
  get(key) {
    return this.store[key];
  }

  /**
   * Subscribe to changes for a given key.
   * Returns an unsubscribe function.
   */
  subscribe(key, callback) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
    }

    this.subscribers[key].push(callback);

    return () => {
      this.subscribers[key] = this.subscribers[key].filter((cb) => cb !== callback);
    };
  }

  /**
   * Persist a key in IndexedDB with TTL (retain time in ms).
   */
  async retain(key, value, ttl) {
    if (typeof window === "undefined") return;

    const expiresAt = Date.now() + ttl;

    try {
      await saveToIDB(key, value, expiresAt);
      this.set(key, value);
    } catch (err) {
      console.warn(`GlobalStore: Failed to persist ${key} in IndexedDB`, err);
    }
  }

  /**
   * For debugging or dev tools.
   */
  getAllKeys() {
    return Object.keys(this.store);
  }
}

export const globalStore = new GlobalStore();
