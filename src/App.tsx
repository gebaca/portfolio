import './index.css';
import NavSection from './Components/Sections/NavSection';
import About from './Components/Sections/About';
import Experience from './Components/Sections/Experience';
import Works from './Components/Sections/Works';
import HouseStrip from './Components/Houses/HouseStrip';

export default function App() {
  return (
    <div className='mx-auto min-h-screen max-w-7xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0'>
      <div className='lg:flex lg:justify-between lg:gap-4'>
        {/* Columna izquierda fija */}
        <header className='lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24'>
          <div>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl text-[#01054E]'>
              Gerard Bataller Canet
            </h1>
            <h2 className='mt-3 text-lg font-medium sm:text-xl text-[#01054E]'>
              Frontend Developer
            </h2>
            <p className='mt-4 max-w-xs leading-normal text-[#01054E]'>
              I bring design and programming together to shape how digital
              products look, behave, and work.
            </p>

            <div className='mt-16 hidden lg:block'>
              <NavSection />
            </div>
          </div>

          {/* Iconos sociales opcionales abajo */}
          <div className='mt-8 flex items-center gap-5'>
            {/* GitHub, LinkedIn, etc. */}
          </div>
        </header>

        {/* Columna derecha con scroll */}
        <main className='space-y-16 pt-24 md:space-y-24 lg:w-[52%] lg:space-y-36 lg:py-24'>
          <Works />
          <Experience />
          <About />
        </main>
      </div>
      <HouseStrip />
    </div>
  );
}
