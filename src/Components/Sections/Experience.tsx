const experiences = [
  {
    company: 'Mutua Madrileña',
    role: 'Frontend Developer / UX/UI Design',
    period: 'Jan — Apr 2026',
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

export default function Experience() {
  return (
    <section id='experience' className='scroll-mt-24'>
      <h2 className='mb-8 text-sm font-semibold uppercase tracking-widest text-muted lg:hidden'>
        Experience
      </h2>

      <div className='space-y-12'>
        {experiences.map((experience) => (
          <article
            key={experience.company}
            className='group grid grid-cols-1 gap-2 sm:grid-cols-[140px_1fr] sm:gap-6'
          >
            {/* Date */}
            <p className='pt-1 text-xs font-medium uppercase tracking-wide text-muted'>
              {experience.period}
            </p>

            {/* Experience details */}
            <div>
              <h3>
                {experience.role}
                <span className='text-muted'> · </span>
                <span className='transition-colors group-hover:text-highlight'>
                  {experience.company}
                </span>
              </h3>

              <ul className='mt-3 space-y-2'>
                {experience.description.map((item, index) => (
                  <li
                    key={index}
                    className='text-text/80'
                  >
                    {item}
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className='mt-4 flex flex-wrap gap-2'>
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
        ))}
      </div>
    </section>
  );
}
