import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { showcaseProjects, linkLabels } from '../utils/projects';
import type { LinkKind, ShowcaseProject } from '../utils/projects';

// Iconos de línea sencillos, sin dependencias
const iconShapes: Record<LinkKind, ReactNode> = {
  paper: (
    <>
      <path d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' />
      <polyline points='14 2 14 8 20 8' />
      <line x1='16' y1='13' x2='8' y2='13' />
      <line x1='16' y1='17' x2='8' y2='17' />
    </>
  ),
  live: (
    <>
      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
      <polyline points='15 3 21 3 21 9' />
      <line x1='10' y1='14' x2='21' y2='3' />
    </>
  ),
  'case-study': (
    <>
      <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
      <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
    </>
  ),
};

function LinkIcon({ kind }: { kind: LinkKind }) {
  return (
    <svg
      viewBox='0 0 24 24'
      width='16'
      height='16'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.75'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      focusable='false'
    >
      {iconShapes[kind]}
    </svg>
  );
}

function ProjectCard({
  project,
  priority,
}: {
  project: ShowcaseProject;
  priority: boolean;
}) {
  const paragraphs = project.description.split('\n\n');
  // Ignora enlaces sin URL, para poder dejar el hueco preparado
  const links = (project.links ?? []).filter((link) => link.href);

  return (
    <article className='work-card py-6 transition-[filter,opacity] duration-300 motion-reduce:transition-none'>
      {/* Título y enlaces juntos: los iconos van pegados al final del título */}
      <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
        <h3 className='font-bold'>
          {project.title}
          {project.subtitle && (
            <span className='font-light text-text/70'>
              {' '}
              · {project.subtitle}
            </span>
          )}
        </h3>

        {links.length > 0 && (
          <ul className='-ml-1.5 flex items-center'>
            {links.map((link) => {
              const label = linkLabels[link.kind];
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    title={label}
                    aria-label={`${label}: ${project.title} (opens in a new tab)`}
                    className='flex size-7 items-center justify-center rounded text-wash-500 transition-colors hover:text-highlight focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-highlight'
                  >
                    <LinkIcon kind={link.kind} />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className='mt-3 space-y-3'>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {project.results && (
        <p className='mt-3 text-sm font-light text-text/80'>
          {project.results}
        </p>
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
