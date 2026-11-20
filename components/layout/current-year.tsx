"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Read on the client only so the prerendered shell stays static (Cache Components). */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}
