import { Link } from 'react-router-dom';
import { archivedProjects } from '../utils/projects';

function displayUrl(url: string) {
  return new URL(url).hostname.replace(/^www\./, '');
}

export default function Archive() {
  return (
    <main className='mx-auto min-h-screen max-w-3xl px-6 py-16 md:px-12'>
      <Link
        to='/#works'
        className='text-base font-medium text-wash-500 hover:text-highlight'
      >
        ← Back
      </Link>

      <h1 className='mt-6 text-3xl font-bold text-text'>All Projects</h1>

      <table className='mt-10 w-full border-collapse text-left'>
        <thead>
          <tr className='border-b border-ink/20 text-xs uppercase tracking-wide text-ink/70'>
            <th scope='col' className='py-3 pr-4 font-medium'>
              Year
            </th>
            <th scope='col' className='py-3 pr-4 font-medium'>
              Project
            </th>
            <th
              scope='col'
              className='hidden py-3 pr-4 font-medium md:table-cell'
            >
              Made at
            </th>
            <th
              scope='col'
              className='hidden py-3 pr-4 font-medium lg:table-cell'
            >
              Built with
            </th>
            <th scope='col' className='hidden py-3 font-medium sm:table-cell'>
              Link
            </th>
          </tr>
        </thead>
        <tbody>
          {archivedProjects.map((project) => (
            <tr
              key={project.id}
              className='border-b border-ink/10 align-top'
            >
              <td className='py-4 pr-4 text-ink/70'>{project.year ?? '—'}</td>
              <td className='py-4 pr-4 font-semibold text-ink'>
                {project.url ? (
                  <a
                    href={project.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-highlight'
                  >
                    {project.title}
                    <span className='sr-only'> (opens in a new tab)</span>
                  </a>
                ) : (
                  project.title
                )}
              </td>
              <td className='hidden py-4 pr-4 text-ink/80 md:table-cell'>
                {project.context ?? '—'}
              </td>
              <td className='hidden py-4 pr-4 lg:table-cell'>
                <ul className='flex flex-wrap gap-2'>
                  {project.stack.map((technology) => (
                    <li
                      key={technology}
                      className='rounded-full bg-wash-100/60 px-3 py-1 text-xs font-medium text-wash-700'
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </td>
              <td className='hidden py-4 sm:table-cell'>
                {project.url && (
                  <a
                    href={project.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-hidden='true'
                    tabIndex={-1}
                    className='text-wash-500 underline underline-offset-4 hover:text-highlight'
                  >
                    {displayUrl(project.url)}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
