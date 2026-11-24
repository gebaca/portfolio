import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useParallaxStrip } from './useParallaxStrip';
import { buildPieces, HIDDEN_PX, PIECE } from './houses';
import { piecesNeeded } from './motion';

export default function HouseStrip() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  // Recalcula cuántas piezas hacen falta si cambia la altura de la página o de la ventana
  useEffect(() => {
    const update = () => {
      setCount(
        piecesNeeded(
          document.documentElement.scrollHeight,
          window.innerHeight,
          PIECE[0].height
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

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      style={{ '--hidden': `${HIDDEN_PX}px` } as CSSProperties}
      className='pointer-events-none fixed inset-y-0 right-0 z-0 select-none'
    >
      <div
        ref={columnRef}
        className='absolute right-0 top-0 flex flex-col items-end'
      >
        {pieces.map((piece) => (
          <img
            key={piece.id}
            data-piece
            src={piece.image}
            width={piece.width}
            height={piece.height}
            alt=''
            draggable={false}
            className='-mr-(--hidden) block h-auto max-w-none flex-none will-change-transform drop-shadow-[-5px_7px_6px_rgba(27,42,58,0.35)]'
          />
        ))}
      </div>
    </div>
  );
}
