export type FocusMode = 'project' | 'single';

export interface ActiveFocusTarget {
  key: string;
  getViewportRect: () => { top: number; bottom: number } | null;
  mode: FocusMode;
}

type Listener = (target: ActiveFocusTarget | null) => void;

let currentTarget: ActiveFocusTarget | null = null;
const listeners = new Set<Listener>();

export function setActiveFocusTarget(target: ActiveFocusTarget | null) {
  const unchanged =
    (currentTarget === null && target === null) ||
    (currentTarget !== null &&
      target !== null &&
      currentTarget.key === target.key);

  if (unchanged) return;
  currentTarget = target;
  listeners.forEach((fn) => fn(currentTarget));
}

export function getActiveFocusTarget(): ActiveFocusTarget | null {
  return currentTarget;
}

export function subscribeFocusTarget(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
