export interface HousePiece {
  id: number;
  image: string;
  width: number;
  height: number;
}

// Debe ser mayor que MAX_SHIFT de motion.ts
export const HIDDEN_PX = 90;

// Solape vertical para evitar huecos o aire transparente entre piezas
export const VERTICAL_OVERLAP_PX = 8;

export const PIECE = [
  { image: '/casas/h1.webp', width: 174, height: 167 },
  { image: '/casas/h2.webp', width: 174, height: 167 },
  { image: '/casas/h3.webp', width: 174, height: 167 },
  { image: '/casas/h4.webp', width: 174, height: 167 },
  { image: '/casas/h5.webp', width: 174, height: 167 },
  { image: '/casas/h6.webp', width: 174, height: 167 },
];

export const CONNECTOR_IMAGE = '/casas/bg.webp';

const FIRST_PIECE_INDEX = 5; // h6.webp solo al principio
const UNIQUE_INDICES = [0, 2, 1, 4, 3]; // h1, h3, h2, h5, h4 sin repetir mientras haya hueco
const REPEAT_INDICES = [1, 3]; // Solo h2 y h4 pueden repetirse si hacen falta más casas

export function buildPieces(
  count: number,
  uniqueOrder: number[] = UNIQUE_INDICES,
  repeatOrder: number[] = REPEAT_INDICES
): HousePiece[] {
  if (count <= 0) return [];

  const result: HousePiece[] = [];
  let uniqueCursor = 0;
  let repeatCursor = 0;

  for (let i = 0; i < count; i++) {
    let pieceIndex: number;

    if (i === 0) {
      pieceIndex = FIRST_PIECE_INDEX;
    } else if (uniqueCursor < uniqueOrder.length) {
      pieceIndex = uniqueOrder[uniqueCursor++];
    } else {
      pieceIndex = repeatOrder[repeatCursor % repeatOrder.length] ?? 0;
      repeatCursor++;
    }

    const base = PIECE[pieceIndex] ?? PIECE[0];
    result.push({ id: i + 1, ...base });
  }

  return result;
}
