import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getShift, PARALLAX, type HoverBand } from './motion';
import {
  getActiveFocusTarget,
  subscribeFocusTarget,
  type ActiveFocusTarget,
} from './houseFocus';
import type { HousePiece } from './houses';

export function useParallaxStrip(
  containerRef: RefObject<HTMLDivElement | null>,
  columnRef: RefObject<HTMLDivElement | null>,
  count: number,
  pieces: HousePiece[] = [],
  factor: number = 1,
  itemSelector: string = '[data-piece]',
  duration: number = 0.25
) {
  useGSAP(
    () => {
      const column = columnRef.current;
      if (!column || count === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          fine: '(hover: hover) and (pointer: fine)',
        },
        (context) => {
          const { motion, fine } = context.conditions as {
            motion: boolean;
            fine: boolean;
          };
          if (!motion || !fine) return;

          const elements = gsap.utils.toArray<HTMLElement>(
            itemSelector,
            column
          );
          if (!elements.length) return;

          const extraXs = elements.map((_, i) =>
            Math.round((pieces[i]?.shiftX ?? 0) * factor)
          );

          const setColumnY = gsap.quickSetter(column, 'y', 'px');
          const quickXs = elements.map((el, i) =>
            gsap.quickTo(el, 'x', {
              duration: duration + (i % 6) * 0.03,
              ease: 'power3.out',
            })
          );

          let pointerY = Number.POSITIVE_INFINITY;
          let activeTarget: ActiveFocusTarget | null = getActiveFocusTarget();
          let lastScroll = NaN;
          let lastPointer = NaN;
          let lastTargetKey: string | null = null;

          const render = () => {
            const scrollY = window.scrollY;
            const targetKey = activeTarget ? activeTarget.key : null;

            const rect = activeTarget ? activeTarget.getViewportRect() : null;
            const hoverBand: HoverBand | null = rect
              ? { top: rect.top, bottom: rect.bottom }
              : null;

            if (
              scrollY === lastScroll &&
              pointerY === lastPointer &&
              targetKey === lastTargetKey &&
              !hoverBand
            ) {
              return;
            }

            lastScroll = scrollY;
            lastPointer = pointerY;
            lastTargetKey = targetKey;

            const offset = Math.round(scrollY * PARALLAX);
            setColumnY(-offset);

            for (let i = 0; i < elements.length; i++) {
              const pieceRect = elements[i].getBoundingClientRect();
              const pieceCenterY = pieceRect.top + pieceRect.height / 2;
              quickXs[i](
                getShift(pointerY, pieceCenterY, hoverBand) + extraXs[i]
              );
            }
          };

          const unsubscribe = subscribeFocusTarget((target) => {
            activeTarget = target;
            lastTargetKey = null;
          });

          const onPointerMove = (e: PointerEvent) => {
            pointerY = e.clientY;
          };
          const onLeave = () => {
            pointerY = Number.POSITIVE_INFINITY;
          };

          gsap.ticker.add(render);
          window.addEventListener('pointermove', onPointerMove, {
            passive: true,
          });
          document.documentElement.addEventListener('pointerleave', onLeave);

          return () => {
            unsubscribe();
            gsap.ticker.remove(render);
            window.removeEventListener('pointermove', onPointerMove);
            document.documentElement.removeEventListener(
              'pointerleave',
              onLeave
            );
          };
        }
      );

      return () => mm.revert();
    },
    {
      scope: containerRef,
      dependencies: [count, pieces, factor, itemSelector, duration],
    }
  );
}
