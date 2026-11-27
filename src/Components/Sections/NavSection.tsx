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
  github: 'https://github.com/gebaca',
  linkedin: 'https://www.linkedin.com/in/gerard-bataller-canet-963394372/',
  phone: '+34 615 180 314',
  email: 'gerard.bataller.canet@gmail.com',
};

type CopiedField = 'phone' | 'email' | null;

function GitHubIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 16 16'
      fill='currentColor'
      className='h-6 w-6'
      aria-hidden='true'
    >
      <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='h-6 w-6'
      aria-hidden='true'
    >
      <path d='M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z' />
    </svg>
  );
}

export function NavList() {
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

  return (
    <nav className='hidden lg:block' aria-label='In-page jump links'>
      <ul className='mt-16 w-max font-display'>
        {NAV_ITEMS.map((item) => (
          <li key={item.targetId}>
            <button
              type='button'
              onClick={(event) => handleClick(event, item.targetId)}
              onPointerEnter={(event) =>
                reportBand(event.currentTarget, item.targetId)
              }
              onPointerLeave={clearBand}
              onFocus={(event) =>
                reportBand(event.currentTarget, item.targetId)
              }
              onBlur={clearBand}
              className='group flex items-center py-3 text-sm uppercase tracking-wider text-text/75 transition-colors hover:text-highlight focus-visible:text-highlight'
            >
              <span className='mr-4 h-[1.5px] w-8 bg-text/40 transition-all group-hover:w-16 group-hover:bg-highlight group-focus-visible:w-16 group-focus-visible:bg-highlight' />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ContactLinks() {
  const [copied, setCopied] = useState<CopiedField>(null);

  const handleCopy = async (
    value: string,
    field: Exclude<CopiedField, null>
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      window.setTimeout(() => {
        setCopied((prev) => (prev === field ? null : prev));
      }, 2000);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className='ml-1 flex flex-col items-start gap-2.5'>
      <ul className='flex items-center gap-5' aria-label='Social media'>
        <li className='shrink-0 text-xs'>
          <a
            href={CONTACT.github}
            target='_blank'
            rel='noreferrer noopener'
            aria-label='GitHub (opens in a new tab)'
            title='GitHub'
            className='block text-text/75 transition-colors hover:text-highlight focus-visible:text-highlight'
          >
            <span className='sr-only'>GitHub</span>
            <GitHubIcon />
          </a>
        </li>
        <li className='shrink-0 text-xs'>
          <a
            href={CONTACT.linkedin}
            target='_blank'
            rel='noreferrer noopener'
            aria-label='LinkedIn (opens in a new tab)'
            title='LinkedIn'
            className='block text-text/75 transition-colors hover:text-highlight focus-visible:text-highlight'
          >
            <span className='sr-only'>LinkedIn</span>
            <LinkedInIcon />
          </a>
        </li>
      </ul>

      <div className='flex flex-col items-start gap-1.5 text-sm text-text/80'>
        <button
          type='button'
          onClick={() => handleCopy(CONTACT.phone, 'phone')}
          className='cursor-pointer text-left transition-colors hover:text-highlight focus-visible:text-highlight'
        >
          <span>{CONTACT.phone}</span>
          <span className='ml-2 text-xs font-medium text-highlight'>
            {copied === 'phone' ? 'copied' : 'copy'}
          </span>
        </button>

        <button
          type='button'
          onClick={() => handleCopy(CONTACT.email, 'email')}
          className='cursor-pointer text-left transition-colors hover:text-highlight focus-visible:text-highlight'
        >
          <span>{CONTACT.email}</span>
          <span className='ml-2 text-xs font-medium text-highlight'>
            {copied === 'email' ? 'copied' : 'copy'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default NavList;
