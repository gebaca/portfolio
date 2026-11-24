export default function About() {
  return (
    <section
      id='about'
      aria-label='About me'
      className='mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24'
    >
      <div className='sticky top-0 z-20 -mx-6 mb-4 w-screen bg-bg/80 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0'>
        <h2 className='text-sm font-bold uppercase tracking-widest text-text lg:sr-only'>
          About
        </h2>
      </div>

      <div className='space-y-4 leading-relaxed text-text/80'>
        <p>
          I see{' '}
          <strong className='font-semibold text-text'>
            design and programming
          </strong>{' '}
          as interconnected parts of building digital products. Understanding
          how a product works means looking at it from both perspectives: how it
          is designed and experienced, and how its components, logic and
          underlying systems work together.
        </p>

        <p>
          When I encounter something I don&apos;t understand, I investigate it
          rather than work around it. I read documentation, explore different
          approaches and build{' '}
          <strong className='font-semibold text-[#01054E]'>
            small experiments
          </strong>{' '}
          to understand how things behave before committing to a solution. I
          also{' '}
          <strong className='font-semibold text-text'>
            document the reasoning
          </strong>{' '}
          behind my decisions, so they can be understood, discussed and
          revisited later.
        </p>

        <p>
          I&apos;m particularly drawn to the evolution of digital products,
          especially how{' '}
          <strong className='font-semibold text-text'>
            animation and visual communication
          </strong>{' '}
          can make complex software easier to understand. I&apos;m looking for a
          team where I can work closely with both design and engineering,
          contribute to real products and learn from more experienced
          developers.
        </p>
      </div>
    </section>
  );
}
