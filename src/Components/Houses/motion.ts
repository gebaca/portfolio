export const MAX_SHIFT = 40; // px máximos hacia el centro
export const RADIUS = 280; // radio de influencia del puntero
export const PARALLAX = 0.6; // 1 = se mueve como la página, <1 = más lento (más lejano)

/** Desplazamiento en X (negativo = hacia el centro, columna derecha). */
export function getShift(
  pointerY: number,
  pieceCenterY: number,
  maxShift: number = MAX_SHIFT,
  radius: number = RADIUS
): number {
  const diff = Math.abs(pointerY - pieceCenterY);
  if (diff >= radius) return 0;

  const t = 1 - diff / radius;
  const weight = t * t * (3 - 2 * t); // smoothstep
  return -Math.abs(maxShift) * weight;
}

/** Cuántas piezas hacen falta para cubrir la columna durante todo el scroll. */
export function piecesNeeded(
  docHeight: number,
  viewportHeight: number,
  pieceHeight: number,
  factor: number = PARALLAX
): number {
  const scrollable = Math.max(0, docHeight - viewportHeight);
  return Math.ceil((viewportHeight + scrollable * factor) / pieceHeight) + 1;
}
