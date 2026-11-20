export interface HousePiece {
  id: number;
  image: string;
  width: number;
  height: number;
}

// Debe ser mayor que MAX_SHIFT de motion.ts
export const HIDDEN_PX = 120;

export const PIECE = { image: '/placeholder_x.webp', width: 274, height: 167 };

// Cuando tengas 3 formas, aquí eliges cuál toca en cada posición (por ejemplo, i % 3)
export function buildPieces(count: number): HousePiece[] {
  return Array.from({ length: count }, (_, i) => ({ id: i + 1, ...PIECE }));
}
