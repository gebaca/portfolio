import { showcaseProjects, linkLabels } from '../utils/projects';
import type { GalleryItem, ShowcaseProject } from '../utils/projects';
import { Link } from 'react-router-dom';

// Unifica galería e imagen única en una lista de medios
function getMedia(project: ShowcaseProject): GalleryItem[] {
  if (project.gallery?.length) return project.gallery;
  if (project.image) {
    return [
      {
        label: '',
        alt: project.imageAlt ?? `${project.title} preview`,
        src: project.image,
      },
    ];
  }
  return [];
}

function ProjectCard({
  project,
  priority,
}: {
  project: ShowcaseProject;
  priority: boolean;
}) {
  const paragraphs = project.description.split('\n\n');
  const media = getMedia(project);

  return (
    // py-6 en vez de space-y: así no hay huecos sin hover entre tarjetas
    <article className='work-card py-6 transition-[filter,opacity] duration-300 motion-reduce:transition-none'>
      <h3 className='font-semibold leading-snug text-ink'>
        {project.title}
        {project.subtitle && (
          <span className='font-normal text-ink/70'> · {project.subtitle}</span>
        )}
      </h3>

      <div className='mt-3 space-y-3'>
        {paragraphs.map((paragraph, index) => (
          <p key={index} className='text-sm leading-relaxed text-ink/80'>
            {paragraph}
          </p>
        ))}
      </div>

      {project.results && (
        <p className='mt-3 text-sm font-medium text-wash-700'>
          {project.results}
        </p>
      )}

      {media.length > 0 && (
        <div className='mt-5 space-y-6'>
          {media.map((item, index) => (
            <figure key={item.src}>
              <picture>
                {/* Con movimiento reducido, el navegador usa el fotograma estático */}
                {item.poster && (
                  <source
                    media='(prefers-reduced-motion: reduce)'
                    srcSet={item.poster}
                  />
                )}
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={priority && index === 0 ? 'eager' : 'lazy'}
                  className='h-auto w-full rounded border border-ink/10'
                />
              </picture>
              {item.label && (
                <figcaption className='mt-2 text-xs font-medium uppercase tracking-wide text-ink/70'>
                  {item.label}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <ul className='mt-5 flex flex-wrap gap-x-5 gap-y-1'>
          {project.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='text-sm font-medium text-wash-500 underline underline-offset-4 hover:text-wash-700'
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
        className='mt-10 inline-block text-sm font-medium text-wash-500 underline underline-offset-4 hover:text-wash-700'
      >
        View full project archive →
      </Link>
    </section>
  );
}
