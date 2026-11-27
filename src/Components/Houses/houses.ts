export interface HousePiece {
  id: number;
  image: string;
  width: number; // ancho real del archivo, en px
  height: number; // alto real del archivo, en px
  peek?: number; // opcional: cuánto asoma esta pieza en reposo (px a 1440)
  shiftX?: number; // opcional: desplazamiento extra en X en px a 1440 (negativo = más hacia el centro)
  offsetY?: number; // opcional: desplazamiento vertical en px a 1440 (negativo = más arriba)
}

export type StripSide = 'left' | 'right';

export const BASE_SCALE = 0.5;
export const PEEK_PX = 160;
export const VERTICAL_OVERLAP_PX = 6;

// Sombra dura, como en el póster. Con el contenedor espejado de la izquierda,
// las dos sombras caen hacia el centro.
export const HOUSE_SHADOW = 'drop-shadow(-4px 5px 1px rgba(1, 5, 78, 0.38))';

export function getViewportFactor(viewportWidth: number): number {
  return Math.min(1.15, Math.max(0.7, viewportWidth / 1440));
}

export const PIECES_RIGHT: Omit<HousePiece, 'id'>[] = [
  { image: '/casas/h1.webp', width: 902, height: 334 },
  { image: '/casas/h2.webp', width: 910, height: 147 },
  { image: '/casas/h3.webp', width: 931, height: 134 },
  {
    image: '/casas/h4.webp',
    width: 1028,
    height: 537,
    peek: 220,
    shiftX: 2,
    offsetY: -40,
  },
  { image: '/casas/h5.webp', width: 921, height: 119 },
  { image: '/casas/h6.webp', width: 903, height: 224 },
  { image: '/casas/h7.webp', width: 969, height: 213 },
];

// Tira izquierda: su propio array, independiente del de la derecha.
// Mientras no haya dibujos nuevos, apunta a los mismos archivos.
// Cada archivo nuevo se exporta volteado horizontalmente: el contenedor de la
// izquierda lo espeja de vuelta, así que no hay que tocar nada más.
export const PIECES_LEFT: Omit<HousePiece, 'id'>[] = [
  { image: '/casas/h1.webp', width: 902, height: 334 },
  { image: '/casas/h2.webp', width: 910, height: 147 },
  { image: '/casas/h3.webp', width: 931, height: 134 },
  {
    image: '/casas/h4.webp',
    width: 1028,
    height: 537,
    peek: 220,
    shiftX: 2,
    offsetY: -40,
  },
  { image: '/casas/h5.webp', width: 921, height: 119 },
  { image: '/casas/h6.webp', width: 903, height: 224 },
  { image: '/casas/h7.webp', width: 969, height: 213 },
];

export function buildPieces(
  side: StripSide = 'right',
  maxCount?: number
): HousePiece[] {
  const source = side === 'left' ? PIECES_LEFT : PIECES_RIGHT;
  const limit =
    typeof maxCount === 'number'
      ? Math.max(0, Math.min(maxCount, source.length))
      : source.length;

  return source.slice(0, limit).map((base, index) => ({
    id: index + 1,
    ...base,
  }));
}
