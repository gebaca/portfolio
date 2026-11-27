import { useState, type MouseEvent } from 'react';
import { pulseHouses, setActiveNavTarget } from '../Houses/houseNav';

interface NavItem {
  label: string;
  targetId: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Works', targetId: 'works' },
  { label: 'Experience', targetId: 'experience' },
  { label: 'About', targetId: 'about' },
];

const CONTACT = {
  github: 'https://github.com/tu-usuario',
  linkedin: 'https://www.linkedin.com/in/tu-usuario',
  phone: '+34 600 000 000',
  email: 'tu@correo.com',
};

function GitHubIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
      className='h-5 w-5'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      aria-hidden='true'
      className='h-5 w-5'
    >
      <path d='M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 10.1H5.67V18.5H8.34V10.1ZM7 6.38A1.55 1.55 0 1 0 7 9.48A1.55 1.55 0 0 0 7 6.38ZM18.34 13.56C18.34 11.15 16.92 9.86 14.89 9.86C13.45 9.86 12.71 10.65 12.35 11.21V10.1H9.77C9.8 10.83 9.77 18.5 9.77 18.5H12.44V13.81C12.44 13.56 12.46 13.31 12.53 13.13C12.73 12.64 13.19 12.13 13.96 12.13C14.95 12.13 15.67 12.88 15.67 13.98V18.5H18.34V13.56Z' />
    </svg>
  );
}

export default function NavSection() {
  const [copied, setCopied] = useState(false);

  const reportBand = (el: HTMLElement, id: string) => {
    setActiveNavTarget({
      key: `nav-${id}`,
      getViewportRect: () => {
        const rect = el.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom };
      },
    });
  };

  const clearBand = () => {
    setActiveNavTarget(null);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pulseHouses(rect.top + rect.height / 2);

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className='flex flex-1 flex-col justify-between'>
      <nav className='flex flex-col items-start gap-3 font-display'>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.targetId}
            type='button'
            onClick={(event) => handleClick(event, item.targetId)}
            onPointerEnter={(event) =>
              reportBand(event.currentTarget, item.targetId)
            }
            onPointerLeave={clearBand}
            onFocus={(event) => reportBand(event.currentTarget, item.targetId)}
            onBlur={clearBand}
            className='group flex items-center py-1.5 text-sm uppercase tracking-wider text-text/75 transition-colors hover:text-highlight focus-visible:text-highlight'
          >
            <span className='mr-4 h-[1.5px] w-8 bg-text/40 transition-all group-hover:w-16 group-hover:bg-highlight group-focus-visible:w-16 group-focus-visible:bg-highlight' />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className='mt-auto flex flex-col items-start gap-2.5 pt-8 text-sm text-text/80'>
        <div className='flex items-center gap-4 text-text/75'>
          <a
            href={CONTACT.github}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub (opens in a new tab)'
            className='transition-colors hover:text-highlight focus-visible:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'
          >
            <GitHubIcon />
          </a>
          <a
            href={CONTACT.linkedin}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn (opens in a new tab)'
            className='transition-colors hover:text-highlight focus-visible:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'
          >
            <LinkedInIcon />
          </a>
        </div>

        <a
          href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
          className='text-text/80 transition-colors hover:text-highlight focus-visible:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'
        >
          {CONTACT.phone}
        </a>

        <button
          type='button'
          onClick={handleCopyEmail}
          title='Copiar correo electrónico'
          className='cursor-pointer text-left text-text/80 transition-colors hover:text-highlight focus-visible:text-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight'
        >
          <span>{CONTACT.email}</span>
          <span className='ml-2 text-xs font-medium text-highlight'>
            {copied ? 'Copiado' : 'Copiar'}
          </span>
        </button>
      </div>
    </div>
  );
}
