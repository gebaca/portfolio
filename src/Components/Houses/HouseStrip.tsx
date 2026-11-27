import { useEffect, useMemo, useRef, useState } from 'react';
import { useParallaxStrip } from './useParallaxStrip';
import type { StripVariant } from './useParallaxStrip';
import {
  BASE_SCALE,
  HOUSE_SHADOW,
  PEEK_PX,
  VERTICAL_OVERLAP_PX,
  buildPieces,
  getViewportFactor,
} from './houses';
import type { StripSide } from './houses';

interface HouseStripProps {
  side?: StripSide;
  variant?: StripVariant;
  parallaxFactor?: number;
  shiftScale?: number;
}

const FADE_MIN_WIDTH = 640;
const FADE_MAX_WIDTH = 1280;

function getViewportOpacity(viewportWidth: number): number {
  const raw =
    (viewportWidth - FADE_MIN_WIDTH) / (FADE_MAX_WIDTH - FADE_MIN_WIDTH);
  return Math.min(1, Math.max(0, Number(raw.toFixed(3))));
}

export default function HouseStrip({
  side = 'right',
  variant = 'full',
  parallaxFactor,
  shiftScale,
}: HouseStripProps) {
  const isLeft = side === 'left';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const factor = getViewportFactor(viewportWidth);
  const opacity = getViewportOpacity(viewportWidth);

  const pieces = useMemo(() => buildPieces(side), [side]);
  useParallaxStrip(containerRef, columnRef, pieces, factor, {
    side,
    variant,
    parallaxFactor,
    shiftScale,
  });

  const scale = BASE_SCALE * factor;

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      style={{ opacity }}
      className={`pointer-events-none fixed inset-y-0 z-0 select-none ${
        isLeft ? 'left-0' : 'right-0'
      }`}
    >
      <div
        ref={columnRef}
        className={`relative flex flex-col pt-16 pb-16 ${
          isLeft ? 'items-start' : 'items-end'
        }`}
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
          const tailMargin = -Math.max(0, width - peek);

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
                marginLeft: isLeft ? tailMargin : undefined,
                marginRight: isLeft ? undefined : tailMargin,
                marginTop,
                filter: HOUSE_SHADOW,
              }}
              className='block h-auto max-w-none flex-none will-change-transform'
            />
          );
        })}
      </div>
    </div>
  );
}
