import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useParallaxStrip } from './useParallaxStrip';
import {
  buildPieces,
  CONNECTOR_IMAGE,
  HIDDEN_PX,
  PIECE,
  VERTICAL_OVERLAP_PX,
} from './houses';
import { piecesNeeded } from './motion';

export default function HouseStrip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);
  const [connectorRatio, setConnectorRatio] = useState<number | null>(null);
  const [connectorBounds, setConnectorBounds] = useState<{
    top: number;
    height: number;
  }>({ top: 0, height: 0 });

  const stripTopPx = 140;
  const stripWidth = 104;
  // Margen extra para asegurar que no asome antes de la última casa
  const endBeforeLastHouseOffset = 16;

  useEffect(() => {
    const img = new Image();
    img.src = CONNECTOR_IMAGE;
    img.onload = () => {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setConnectorRatio(img.naturalHeight / img.naturalWidth);
      }
    };
  }, []);

  useEffect(() => {
    const firstHeight = PIECE[5]?.height ?? PIECE[0].height;
    const effectiveStep = Math.max(1, firstHeight - VERTICAL_OVERLAP_PX);

    const update = () => {
      setCount(
        piecesNeeded(
          document.documentElement.scrollHeight,
          window.innerHeight,
          effectiveStep
        )
      );
    };
    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(document.body);
    window.addEventListener('resize', update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const pieces = useMemo(() => buildPieces(count), [count]);
  useParallaxStrip(containerRef, columnRef, count);

  useLayoutEffect(() => {
    const column = columnRef.current;
    if (!column || pieces.length < 2) {
      setConnectorBounds({ top: 0, height: 0 });
      return;
    }

    const measure = () => {
      const pieceEls = column.querySelectorAll<HTMLElement>('[data-piece]');
      if (pieceEls.length < 2) return;

      const colRect = column.getBoundingClientRect();
      const firstRect = pieceEls[0].getBoundingClientRect();
      const lastRect = pieceEls[pieceEls.length - 1].getBoundingClientRect();

      const startY = Math.max(
        0,
        firstRect.bottom - colRect.top - VERTICAL_OVERLAP_PX
      );
      const endY = Math.max(
        startY,
        lastRect.top - colRect.top - endBeforeLastHouseOffset
      );

      setConnectorBounds({
        top: startY,
        height: Math.max(0, endY - startY),
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(column);
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pieces]);

  const tileHeightPx =
    connectorRatio !== null ? Math.round(stripWidth * connectorRatio) : null;

  const connectorTilesCount = useMemo(() => {
    if (!tileHeightPx || tileHeightPx <= 0 || connectorBounds.height <= 0) {
      return 0;
    }
    return Math.max(1, Math.ceil(connectorBounds.height / tileHeightPx));
  }, [tileHeightPx, connectorBounds.height]);

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      style={
        {
          '--hidden': `${HIDDEN_PX}px`,
          '--overlap': `${VERTICAL_OVERLAP_PX}px`,
          '--strip-w': `${stripWidth}px`,
          '--strip-top': `${stripTopPx}px`,
        } as CSSProperties
      }
      className='pointer-events-none fixed inset-0 z-0 select-none'
    >
      <div
        ref={columnRef}
        style={{ top: 'var(--strip-top)' }}
        className='relative flex w-full flex-col items-end'
      >
        {tileHeightPx && connectorBounds.height > 0 && (
          <div
            aria-hidden='true'
            style={{
              top: `${connectorBounds.top}px`,
              height: `${connectorBounds.height}px`,
            }}
            className='pointer-events-none absolute right-0 -z-10 flex flex-col items-end overflow-hidden'
          >
            {Array.from({ length: connectorTilesCount }).map((_, idx) => (
              <img
                key={`connector-${idx}`}
                src={CONNECTOR_IMAGE}
                alt=''
                draggable={false}
                style={{ height: `${tileHeightPx}px` }}
                className='-mr-(--hidden) block w-(--strip-w) max-w-none shrink-0'
              />
            ))}
          </div>
        )}

        {pieces.map((piece, index) => (
          <img
            key={piece.id}
            data-piece
            src={piece.image}
            width={piece.width}
            height={piece.height}
            alt=''
            draggable={false}
            className={`${
              index > 0 ? '-mt-(--overlap)' : ''
            } -mr-(--hidden) block h-auto max-w-none flex-none will-change-transform drop-shadow-[-5px_7px_6px_rgba(27,42,58,0.35)]`}
          />
        ))}
      </div>
    </div>
  );
}
