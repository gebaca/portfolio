import { Link } from 'react-router-dom';
import { showcaseProjects, linkLabels } from '../utils/projects';
import type { ShowcaseProject } from '../utils/projects';

function ProjectCard({
  project,
  priority,
}: {
  project: ShowcaseProject;
  priority: boolean;
}) {
  const paragraphs = project.description.split('\n\n');

  return (
    // py-6 en vez de space-y: así no hay huecos sin hover entre tarjetas
    <article className='work-card py-6 transition-[filter,opacity] duration-300 motion-reduce:transition-none'>
      <h3>
        {project.title}
        {project.subtitle && (
          <span className='font-normal text-ink/70'> · {project.subtitle}</span>
        )}
      </h3>

      <div className='mt-3 space-y-3'>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {project.results && (
        <p className='mt-3 font-medium text-wash-700'>{project.results}</p>
      )}

      <picture className='mt-5 block'>
        {/* Con movimiento reducido, el navegador usa el fotograma estático */}
        {project.poster && (
          <source
            media='(prefers-reduced-motion: reduce)'
            srcSet={project.poster}
          />
        )}
        <img
          src={project.image}
          alt={project.imageAlt ?? `${project.title} preview`}
          loading={priority ? 'eager' : 'lazy'}
          className='h-auto w-full rounded border border-ink/10'
        />
      </picture>

      {project.links && project.links.length > 0 && (
        <ul className='mt-5 flex flex-wrap gap-x-5 gap-y-1'>
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-base font-medium text-wash-500 underline underline-offset-4 hover:text-highlight'
              >
                {linkLabels[link.kind]}
                <span className='sr-only'> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {project.stack && project.stack.length > 0 && (
        <ul className='mt-4 flex flex-wrap gap-2' aria-label='Technologies'>
          {project.stack.map((technology) => (
            <li
              key={technology}
              className='rounded-full bg-wash-100/60 px-3 py-1 text-xs font-medium text-wash-700'
            >
              {technology}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function Works() {
  return (
    <section
      id='works'
      aria-labelledby='works-title'
      className='min-h-screen scroll-mt-20'
    >
      <h2 id='works-title' className='sr-only'>
        Selected work
      </h2>

      <div className='works-list'>
        {showcaseProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            priority={index === 0}
          />
        ))}
      </div>

      <Link
        to='/archive'
        className='mt-10 inline-block text-base font-medium text-wash-500 underline underline-offset-4 hover:text-highlight'
      >
        View full project archive →
      </Link>
    </section>
  );
}
