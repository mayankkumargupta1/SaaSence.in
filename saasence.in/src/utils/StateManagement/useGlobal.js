import { useEffect, useState } from "react";
import { globalStore } from "./GlobalStore";

export const useGlobal = (key, options = {}) => {
  const { default: defaultValue, retain = null } = options;
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    let unsub;

    (async () => {
      await globalStore.readyPromise;

      const stored = globalStore.get(key);
      const val = stored === undefined ? defaultValue : stored;
      setValue(val);

      if (stored === undefined && defaultValue !== undefined) {
        if (retain) {
          globalStore.retain(key, defaultValue, retain);
        } else {
          globalStore.set(key, defaultValue);
        }
      }

      unsub = globalStore.subscribe(key, (val) => {
        setValue(val === undefined ? defaultValue : val);
      });
    })();

    return () => unsub?.();
  }, [key, defaultValue, retain]);

  const setGlobal = (val) => {
    if (retain) {
      globalStore.retain(key, val, retain);
    } else {
      globalStore.set(key, val);
    }
  };

  return [value, setGlobal];
};
