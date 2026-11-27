import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NavSection from '../Sections/NavSection';
import About from '../Sections/About';
import Experience from '../Sections/Experience';
import Works from '../Sections/Works';

gsap.registerPlugin(useGSAP);

export default function Home() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Solo anima si el usuario no ha pedido reducir el movimiento
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('[data-intro="title"]', { autoAlpha: 0, y: 30, duration: 0.9 })
          .from(
            '[data-intro="subtitle"]',
            { autoAlpha: 0, y: 20, duration: 0.7 },
            '-=0.55'
          )
          .from(
            '[data-intro="text"]',
            { autoAlpha: 0, y: 20, duration: 0.7 },
            '-=0.5'
          )
          .from(
            '[data-intro="nav"]',
            { autoAlpha: 0, x: -24, duration: 0.7 },
            '-=0.4'
          )
          .from(
            '[data-intro="social"]',
            { autoAlpha: 0, y: 12, duration: 0.6 },
            '-=0.5'
          )
          .from(
            '[data-intro="section"]',
            { autoAlpha: 0, y: -28, duration: 0.7, stagger: 0.15 },
            '-=0.8'
          );
      });
    },
    { scope: root } // limita los selectores a este componente
  );

  return (
    <div
      ref={root}
      className='mx-auto min-h-screen max-w-7xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0'
    >
      <div className='lg:flex lg:justify-between lg:gap-4'>
        {/* Columna izquierda fija */}
        <header className='lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24'>
          <div>
            <h1 data-intro='title'>Gerard Bataller Canet</h1>
            <h2 data-intro='subtitle' className='mt-3'>
              Frontend Developer
            </h2>
            <p data-intro='text' className='mt-4 max-w-xs'>
              I bring design and programming together to shape how digital
              products look, behave, and work.
            </p>

            <div data-intro='nav' className='mt-16 hidden lg:block'>
              <NavSection />
            </div>
          </div>

          <div data-intro='social' className='mt-8 flex items-center gap-5'>
            {/* GitHub, LinkedIn, etc. */}
          </div>
        </header>

        {/* Columna derecha con scroll */}
        <main className='space-y-16 pt-24 md:space-y-24 lg:w-[52%] lg:space-y-36 lg:py-24'>
          <div data-intro='section'>
            <Works />
          </div>
          <div data-intro='section'>
            <Experience />
          </div>
          <div data-intro='section'>
            <About />
          </div>
        </main>
      </div>
    </div>
  );
}
