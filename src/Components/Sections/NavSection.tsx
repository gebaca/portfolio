import type { MouseEvent } from 'react';
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

export default function NavSection() {
  // Hover y foco: las casas a la altura del ítem se acercan
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
    // Clic: empujón extra hacia el centro
    const rect = event.currentTarget.getBoundingClientRect();
    pulseHouses(rect.top + rect.height / 2);

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
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
  );
}
