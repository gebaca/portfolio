import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HouseStrip from './Houses/HouseStrip';

// Al cambiar de ruta vuelve arriba, salvo que la URL lleve un #hash (entonces va a esa sección)
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <HouseStrip />
      {/* relative z-10: el contenido queda por encima de las casas (z-0) */}
      <div className='relative z-10'>
        <Outlet />
      </div>
    </>
  );
}
