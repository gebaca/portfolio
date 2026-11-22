import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/pages/Home';
import Archive from './Components/pages/Archive';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/archive' element={<Archive />} />
      </Route>
    </Routes>
  );
}
