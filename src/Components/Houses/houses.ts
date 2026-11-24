export interface HousePiece {
  id: number;
  image: string;
  width: number;
  height: number;
}

// Debe ser mayor que MAX_SHIFT de motion.ts
export const HIDDEN_PX = 90;

export const PIECE = [
  { image: '/casas/h1.webp', width: 174, height: 167 },
  { image: '/casas/h2.webp', width: 174, height: 167 },
  { image: '/casas/h3.webp', width: 174, height: 167 },
  { image: '/casas/h4.webp', width: 174, height: 167 },
  { image: '/casas/h5.webp', width: 174, height: 167 },
  { image: '/casas/h6.webp', width: 174, height: 167 },
];

// Cuando tengas 3 formas, aquí eliges cuál toca en cada posición (por ejemplo, i % 3)
// Substituír por array manial. Array empieza y acaba
export function buildPieces(
  count: number,
  order: number[] = [5, 0, 2, 1, 4, 3]
): HousePiece[] {
  return Array.from({ length: count }, (_, i) => {
    const pieceIndex = order[i % order.length] ?? 0;
    const base = PIECE[pieceIndex] ?? PIECE[0];
    return { id: i + 1, ...base };
  });
}
