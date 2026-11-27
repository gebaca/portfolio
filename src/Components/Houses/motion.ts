export const MAX_SHIFT = 40; // desplazamiento normal de la ola con el puntero (px)
export const HOVER_SHIFT = 140; // desplazamiento extra al hacer hover donde quieras (px)
export const RADIUS = 220;
export const PARALLAX = 0.6;

export interface HoverBand {
  top: number;
  bottom: number;
}

/** Desplazamiento en X (negativo = hacia la izquierda / centro). */
export function getShift(
  pointerY: number,
  pieceCenterY: number,
  hoverBand: HoverBand | null = null,
  maxShift: number = MAX_SHIFT,
  radius: number = RADIUS
): number {
  let shift = 0;

  const diff = Math.abs(pointerY - pieceCenterY);
  if (diff < radius) {
    const t = 1 - diff / radius;
    const weight = t * t * (3 - 2 * t);
    shift -= Math.abs(maxShift) * weight;
  }

  if (
    hoverBand &&
    pieceCenterY >= hoverBand.top &&
    pieceCenterY <= hoverBand.bottom
  ) {
    shift -= Math.abs(HOVER_SHIFT);
  }

  return shift;
}

export function piecesNeeded(
  docHeight: number,
  viewportHeight: number,
  pieceHeight: number,
  factor: number = PARALLAX
): number {
  const scrollable = Math.max(0, docHeight - viewportHeight);
  return Math.ceil((viewportHeight + scrollable * factor) / pieceHeight) + 1;
}
