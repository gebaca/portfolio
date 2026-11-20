import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getShift, PARALLAX } from './motion';

export function useParallaxStrip(
  containerRef: RefObject<HTMLDivElement | null>,
  columnRef: RefObject<HTMLDivElement | null>,
  count: number,
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
          if (!motion) return; // movimiento reducido: la tira se queda quieta

          const elements = gsap.utils.toArray<HTMLElement>(
            itemSelector,
            column
          );
          if (!elements.length) return;

          const setColumnY = gsap.quickSetter(column, 'y', 'px');

          // La ola solo con ratón. En táctil queda el parallax del scroll.
          const quickXs = fine
            ? elements.map((el, i) =>
                gsap.quickTo(el, 'x', {
                  duration: duration + (i % 6) * 0.03,
                  ease: 'power3.out',
                })
              )
            : [];

          // Centros respecto a la columna. offsetTop no depende de transforms ni del scroll.
          let baseCenters: number[] = [];
          let pointerY = Number.POSITIVE_INFINITY; // "fuera": todas las piezas a reposo
          let lastScroll = NaN; // NaN fuerza el primer render
          let lastPointer = NaN;

          const measure = () => {
            baseCenters = elements.map(
              (el) => el.offsetTop + el.offsetHeight / 2
            );
            lastScroll = NaN;
          };
          measure();

          // Único escritor: se ejecuta en cada frame, pero sale pronto si nada cambió
          const render = () => {
            const scrollY = window.scrollY;
            if (scrollY === lastScroll && pointerY === lastPointer) return;
            lastScroll = scrollY;
            lastPointer = pointerY;

            const offset = scrollY * PARALLAX;
            setColumnY(-offset);

            if (!fine) return;
            for (let i = 0; i < elements.length; i++) {
              quickXs[i](getShift(pointerY, baseCenters[i] - offset));
            }
          };

          const onPointerMove = (e: PointerEvent) => {
            pointerY = e.clientY;
          };
          const onLeave = () => {
            pointerY = Number.POSITIVE_INFINITY;
          };

          gsap.ticker.add(render);
          if (fine) {
            window.addEventListener('pointermove', onPointerMove, {
              passive: true,
            });
            document.documentElement.addEventListener('pointerleave', onLeave);
          }

          return () => {
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
    { scope: containerRef, dependencies: [count, itemSelector, duration] }
  );
}
