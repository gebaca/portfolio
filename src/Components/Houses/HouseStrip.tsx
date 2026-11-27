import { useEffect, useMemo, useRef, useState } from 'react';
import { useParallaxStrip } from './useParallaxStrip';
import {
  BASE_SCALE,
  PEEK_PX,
  VERTICAL_OVERLAP_PX,
  buildPieces,
  getViewportFactor,
} from './houses';

export default function HouseStrip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [factor, setFactor] = useState(() =>
    getViewportFactor(window.innerWidth)
  );

  useEffect(() => {
    const update = () => setFactor(getViewportFactor(window.innerWidth));
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pieces = useMemo(() => buildPieces(), []);
  useParallaxStrip(containerRef, columnRef, pieces.length, pieces, factor);

  const scale = BASE_SCALE * factor;

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className='pointer-events-none fixed inset-y-0 right-0 z-0 select-none'
    >
      <div
        ref={columnRef}
        className='relative flex flex-col items-end pt-16 pb-16'
      >
        {pieces.map((piece, index) => {
          const width = Math.round(piece.width * scale);
          const height = Math.round(piece.height * scale);
          const peek = Math.round((piece.peek ?? PEEK_PX) * factor);
          const offsetY = piece.offsetY
            ? Math.round(piece.offsetY * factor)
            : 0;
          const prevOffsetY =
            index > 0 && pieces[index - 1]?.offsetY
              ? Math.round((pieces[index - 1].offsetY ?? 0) * factor)
              : 0;

          const baseTopMargin = index > 0 ? -VERTICAL_OVERLAP_PX : 0;
          const marginTop = baseTopMargin + prevOffsetY;

          return (
            <img
              key={piece.id}
              data-piece
              src={piece.image}
              width={width}
              height={height}
              alt=''
              draggable={false}
              style={{
                position: offsetY !== 0 ? 'relative' : undefined,
                top: offsetY !== 0 ? `${offsetY}px` : undefined,
                width,
                aspectRatio: `${piece.width} / ${piece.height}`,
                marginRight: -Math.max(0, width - peek),
                marginTop,
              }}
              className='block h-auto max-w-none flex-none will-change-transform drop-shadow-[-6px_6px_8px_rgba(1,5,78,0.18)]'
            />
          );
        })}
      </div>
    </div>
  );
}
