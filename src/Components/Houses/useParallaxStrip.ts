import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getShift, PARALLAX, type HoverBand } from './motion';
import {
  getActiveFocusTarget,
  subscribeFocusTarget,
  type ActiveFocusTarget,
} from './houseFocus';
import { getActiveNavTarget, subscribePulse } from './houseNav';
import type { HousePiece } from './houses';

// 'full': parallax con el scroll, ola del ratón y reacción a las tarjetas.
// 'nav': columna fija; solo reacciona a la navegación (hover, foco y clic).
export type StripVariant = 'full' | 'nav';

interface StripOptions {
  variant?: StripVariant;
  itemSelector?: string;
  duration?: number;
}

// Cuánto se suma, como múltiplo del desplazamiento normal, en el punto álgido del empujón
const PULSE_BOOST = 1.5;

export function useParallaxStrip(
  containerRef: RefObject<HTMLDivElement | null>,
  columnRef: RefObject<HTMLDivElement | null>,
  pieces: HousePiece[],
  factor: number,
  options: StripOptions = {}
) {
  const {
    variant = 'full',
    itemSelector = '[data-piece]',
    duration = 0.25,
  } = options;
  const isFull = variant === 'full';
  const count = pieces.length;

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

          const pulse = { amount: 0 }; // 0 = sin empujón, 1 = máximo
          let pulseY = 0;
          let pulseTimeline: gsap.core.Timeline | null = null;

          // Solo 'full' usa el puntero global y las tarjetas
          let pointerY = Number.POSITIVE_INFINITY;
          let activeTarget: ActiveFocusTarget | null = isFull
            ? getActiveFocusTarget()
            : null;

          let lastScroll = NaN;
          let lastPointer = NaN;
          let lastTargetKey: string | null = null;
          let lastPulse = NaN;

          const render = () => {
            // Sin parallax, el scroll no cuenta
            const scrollY = isFull ? window.scrollY : 0;

            // Fuente de la banda: tarjetas (full) o ítem de navegación (nav)
            const target = isFull ? activeTarget : getActiveNavTarget();
            const targetKey = target ? target.key : null;
            const rect = target ? target.getViewportRect() : null;
            const hoverBand: HoverBand | null = rect
              ? { top: rect.top, bottom: rect.bottom }
              : null;

            // En 'nav' el puntero global no cuenta: la "posición" es el centro del ítem
            const effectivePointerY = isFull
              ? pointerY
              : hoverBand
                ? (hoverBand.top + hoverBand.bottom) / 2
                : Number.POSITIVE_INFINITY;

            if (
              scrollY === lastScroll &&
              effectivePointerY === lastPointer &&
              targetKey === lastTargetKey &&
              pulse.amount === lastPulse &&
              !hoverBand
            ) {
              return;
            }

            lastScroll = scrollY;
            lastPointer = effectivePointerY;
            lastTargetKey = targetKey;
            lastPulse = pulse.amount;

            if (isFull) setColumnY(-Math.round(scrollY * PARALLAX));

            for (let i = 0; i < elements.length; i++) {
              const pieceRect = elements[i].getBoundingClientRect();
              const pieceCenterY = pieceRect.top + pieceRect.height / 2;

              let shift =
                getShift(effectivePointerY, pieceCenterY, hoverBand) +
                extraXs[i];

              // Empujón: misma curva que la ola, centrada en el punto del clic
              if (pulse.amount > 0) {
                shift +=
                  getShift(pulseY, pieceCenterY, null) *
                  PULSE_BOOST *
                  pulse.amount;
              }

              quickXs[i](shift);
            }
          };

          const unsubscribeFocus = isFull
            ? subscribeFocusTarget((target) => {
                activeTarget = target;
                lastTargetKey = null;
              })
            : () => {};

          const unsubscribePulse = isFull
            ? () => {}
            : subscribePulse((y) => {
                pulseY = y;
                pulseTimeline?.kill();
                pulseTimeline = gsap
                  .timeline()
                  .to(pulse, { amount: 1, duration: 0.18, ease: 'power2.out' })
                  .to(pulse, {
                    amount: 0,
                    duration: 0.7,
                    ease: 'power3.inOut',
                  });
              });

          const onPointerMove = (e: PointerEvent) => {
            pointerY = e.clientY;
          };
          const onLeave = () => {
            pointerY = Number.POSITIVE_INFINITY;
          };

          gsap.ticker.add(render);
          if (isFull) {
            window.addEventListener('pointermove', onPointerMove, {
              passive: true,
            });
            document.documentElement.addEventListener('pointerleave', onLeave);
          }

          return () => {
            unsubscribeFocus();
            unsubscribePulse();
            pulseTimeline?.kill();
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
      dependencies: [count, pieces, factor, variant, itemSelector, duration],
    }
  );
}
