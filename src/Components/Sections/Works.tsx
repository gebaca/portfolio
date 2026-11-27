import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { showcaseProjects, linkLabels } from '../utils/projects';
import type { ShowcaseProject } from '../utils/projects';
import { setActiveFocusTarget, type FocusMode } from '../Houses/houseFocus';

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

function ProjectCard({
  project,
  priority,
}: {
  project: ShowcaseProject;
  priority: boolean;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const paragraphs = project.description
    ? project.description.split('\n\n')
    : [];
  const hasLink = Boolean(project.link?.href);
  const linkLabel = project.link ? linkLabels[project.link.kind] : '';

  const reportBand = (mode: FocusMode) => {
    setActiveFocusTarget({
      key: `project-${project.id}`,
      mode,
      getViewportRect: () => {
        const el = cardRef.current;
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom };
      },
    });
  };

  const clearBand = () => {
    setActiveFocusTarget(null);
  };

  return (
    <article
      ref={cardRef}
      onPointerEnter={() => reportBand('project')}
      onPointerLeave={clearBand}
      onFocus={() => reportBand('project')}
      onBlur={clearBand}
      className={`work-card group relative py-6 transition-[filter,opacity] duration-100 motion-reduce:transition-none ${
        hasLink ? 'cursor-pointer' : ''
      }`}
    >
      <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
        <h3 className='font-bold'>
          {project.link?.href ? (
            <a
              href={project.link.href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`${linkLabel}: ${project.title} (opens in a new tab)`}
              className='inline-flex items-baseline transition-colors group-hover:text-highlight focus-visible:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'
            >
              <span
                aria-hidden='true'
                className='absolute -inset-x-4 -inset-y-3 z-0 rounded-lg transition-colors group-hover:bg-wash-100/30 sm:-inset-x-6 sm:-inset-y-4'
              />
              <span className='relative z-10'>
                {project.title}
                {project.subtitle && (
                  <span className='font-light text-text/70'>
                    {' '}
                    · {project.subtitle}
                  </span>
                )}
                <ExternalArrowIcon />
              </span>
            </a>
          ) : (
            <span>
              {project.title}
              {project.subtitle && (
                <span className='font-light text-text/70'>
                  {' '}
                  · {project.subtitle}
                </span>
              )}
            </span>
          )}
        </h3>
      </div>

      {paragraphs.length > 0 && (
        <div className='pointer-events-none relative z-10 mt-3 space-y-3'>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      {project.results && (
        <p className='pointer-events-none relative z-10 mt-3 text-sm font-light text-text/80'>
          {project.results}
        </p>
      )}

      <picture className='pointer-events-none relative z-10 mt-5 block'>
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
        <ul
          className='pointer-events-none relative z-10 mt-4 flex flex-wrap gap-2'
          aria-label='Technologies'
        >
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
  const archiveLinkRef = useRef<HTMLAnchorElement | null>(null);

  const reportArchiveLink = () => {
    setActiveFocusTarget({
      key: 'archive-link',
      mode: 'single',
      getViewportRect: () => {
        const el = archiveLinkRef.current;
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom };
      },
    });
  };

  const clearArchiveLink = () => {
    setActiveFocusTarget(null);
  };

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
        ref={archiveLinkRef}
        to='/archive'
        onPointerEnter={reportArchiveLink}
        onPointerLeave={clearArchiveLink}
        onFocus={reportArchiveLink}
        onBlur={clearArchiveLink}
        className='group mt-10 inline-flex items-center gap-1.5 text-base font-medium leading-tight text-ink transition-colors hover:text-highlight focus-visible:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight motion-reduce:transition-none'
      >
        <span>View Full Project Archive</span>
        <span
          aria-hidden='true'
          className='inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none'
        >
          →
        </span>
      </Link>
    </section>
  );
}
