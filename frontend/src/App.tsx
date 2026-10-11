import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <div className="p-6 text-xl font-bold text-blue-600">Home / Feria</div>;
}

function About() {
  return <div className="p-6 text-xl font-bold text-green-600">Sobre mí</div>;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <nav className="flex gap-4 p-4 border-b border-slate-700">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">Sobre mí</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}