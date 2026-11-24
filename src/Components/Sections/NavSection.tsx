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
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className='flex flex-col items-start gap-3 font-display'>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.targetId}
          type='button'
          onClick={() => handleScroll(item.targetId)}
          className='group flex items-center py-1.5 text-sm uppercase tracking-wider text-text/75 transition-colors hover:text-highlight focus-visible:text-highlight'
        >
          <span className='mr-4 h-[1.5px] w-8 bg-text/40 transition-all group-hover:w-16 group-hover:bg-highlight group-focus-visible:w-16 group-focus-visible:bg-highlight' />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
