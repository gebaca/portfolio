// Canal de la navegación para la tira de la izquierda.
// Es independiente de houseFocus (tarjetas de proyecto), para que cada tira
// solo reaccione a lo suyo.

export interface NavTarget {
  key: string;
  getViewportRect: () => { top: number; bottom: number } | null;
}

let activeNavTarget: NavTarget | null = null;

export function setActiveNavTarget(target: NavTarget | null) {
  activeNavTarget = target;
}

export function getActiveNavTarget(): NavTarget | null {
  return activeNavTarget;
}

// Empujón al hacer clic
type PulseListener = (y: number) => void;

const pulseListeners = new Set<PulseListener>();

/** Avisa a la tira de que se ha pulsado un ítem a esta altura (px del viewport). */
export function pulseHouses(y: number) {
  pulseListeners.forEach((listener) => listener(y));
}

export function subscribePulse(listener: PulseListener) {
  pulseListeners.add(listener);
  return () => {
    pulseListeners.delete(listener);
  };
}
