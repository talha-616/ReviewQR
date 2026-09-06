"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "@/store/editor-store";

export function StoreHydration() {
  useEffect(() => {
    void useEditorStore.persist?.rehydrate?.();
  }, []);
  return null;
}

export function useStoreHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const api = useEditorStore.persist;
    if (!api?.onFinishHydration) {
      setHydrated(true);
      return;
    }
    void api.rehydrate?.();
    const unsub = api.onFinishHydration(() => setHydrated(true));
    if (api.hasHydrated?.()) setHydrated(true);
    return unsub;
  }, []);

  return hydrated;
}
