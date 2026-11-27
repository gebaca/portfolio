interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies: string[];
  href?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'Mutua Madrileña',
    role: 'Frontend Developer / UX/UI Design',
    period: 'Jan — Apr 2026',
    href: '/docs/mutua.pdf',
    description: [
      'Contributed to the development of a web application designed to streamline asset management operations for clients and the company.',
      'Worked on frontend interface design and implementation, translating operational needs into functional user experiences.',
      'Collaborated with the technology team to integrate the application into existing corporate workflows.',
      'Adapted to corporate development processes and collaboration tools, including Jira and Confluence.',
    ],
    technologies: [
      'Frontend Development',
      'UX/UI Design',
      'Jira',
      'Confluence',
    ],
  },
  {
    company: 'FICIV',
    role: 'Frontend Developer / UX/UI Design',
    period: 'Nov 2023 — Jul 2024',
    description: [
      'Developed an educational web game using C# and JavaScript, focusing on interaction and usability for children.',
      'Adapted the experience to institutional requirements and supported its integration into the official website.',
    ],
    technologies: ['C#', 'JavaScript', 'Unity', 'UX/UI Design'],
  },
  {
    company: 'Consum',
    role: 'Frontend Developer / UX/UI Design',
    period: 'May — Aug 2023',
    description: [
      'Programmed user logic in Unity (C#) and adjusted the design based on real user feedback.',
      'Improved usability based on user feedback and coordinated implementation with a team of 10.',
    ],
    technologies: ['Unity', 'C#', 'UX/UI Design', 'Team Collaboration'],
  },
];

function ExternalArrowIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      aria-hidden='true'
      className='ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none'
    >
      <path
        fillRule='evenodd'
        d='M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z'
        clipRule='evenodd'
      />
    </svg>
  );
}

export default function Experience() {
  return (
    <section id='experience' className='scroll-mt-24'>
      <h2 className='mb-8 text-sm font-semibold uppercase tracking-widest text-muted lg:hidden'>
        Experience
      </h2>

      <div className='space-y-12'>
        {experiences.map((experience) => {
          const isClickable = Boolean(experience.href);

          return (
            <article
              key={experience.company}
              className={`group relative grid grid-cols-1 gap-2 sm:grid-cols-[140px_1fr] sm:gap-6 ${
                isClickable ? 'cursor-pointer' : ''
              }`}
            >
              {/* Date */}
              <p className='pt-1 text-xs font-medium uppercase tracking-wide text-muted'>
                {experience.period}
              </p>

              {/* Experience details */}
              <div>
                <h3>
                  {experience.href ? (
                    <a
                      href={experience.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={`${experience.role} · ${experience.company} - Letter of recommendation (PDF, opens in a new tab)`}
                      className='inline-flex items-baseline transition-colors group-hover:text-highlight focus-visible:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'
                    >
                      {/* Cubre toda la tarjeta <article> (con relative) para que cualquier clic abra el PDF */}
                      <span
                        aria-hidden='true'
                        className='absolute -inset-x-4 -inset-y-3 z-0 rounded-lg transition-colors group-hover:bg-wash-100/30 sm:-inset-x-6 sm:-inset-y-4'
                      />
                      <span className='relative z-10'>
                        {experience.role}
                        <span className='text-muted'> · </span>
                        <span className='inline-block'>
                          {experience.company}
                          <ExternalArrowIcon />
                        </span>
                      </span>
                    </a>
                  ) : (
                    <span>
                      {experience.role}
                      <span className='text-muted'> · </span>
                      <span>{experience.company}</span>
                    </span>
                  )}
                </h3>

                <ul className='relative z-10 mt-3 space-y-2 pointer-events-none'>
                  {experience.description.map((item, index) => (
                    <li key={index} className='text-text/80'>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className='relative z-10 mt-4 flex flex-wrap gap-2 pointer-events-none'>
                  {experience.technologies.map((technology) => (
                    <span
                      key={technology}
                      className='rounded-full bg-wash-100/70 px-3 py-1 text-xs font-medium text-wash-700'
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <a
        href='/docs/CV_GerardBC.pdf'
        target='_blank'
        aria-label='Download my CV (PDF)'
        className='group mt-12 inline-flex items-baseline font-medium transition-colors hover:text-highlight focus-visible:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'
      >
        Download CV
        <ExternalArrowIcon />
      </a>
    </section>
  );
}
