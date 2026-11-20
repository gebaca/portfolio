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
    <nav className='flex flex-col items-start gap-3'>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.targetId}
          type='button'
          onClick={() => handleScroll(item.targetId)}
          className='group flex items-center py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-200 focus-visible:text-slate-200'
        >
          <span className='mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200' />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
