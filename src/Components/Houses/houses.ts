export interface HousePiece {
  id: number;
  image: string;
  width: number; // ancho real del archivo, en px
  height: number; // alto real del archivo, en px
  peek?: number; // opcional: cuánto asoma esta pieza en reposo (px a 1440)
  shiftX?: number; // opcional: desplazamiento extra en X en px a 1440 (negativo = más hacia el centro)
  offsetY?: number; // opcional: desplazamiento vertical en px a 1440 (negativo = más arriba)
}

export const BASE_SCALE = 0.5;
export const PEEK_PX = 160;
export const VERTICAL_OVERLAP_PX = 6;

export function getViewportFactor(viewportWidth: number): number {
  return Math.min(1.15, Math.max(0.7, viewportWidth / 1440));
}

export const PIECE: Omit<HousePiece, 'id'>[] = [
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

export function buildPieces(maxCount?: number): HousePiece[] {
  const limit =
    typeof maxCount === 'number'
      ? Math.max(0, Math.min(maxCount, PIECE.length))
      : PIECE.length;

  return PIECE.slice(0, limit).map((base, index) => ({
    id: index + 1,
    ...base,
  }));
}
