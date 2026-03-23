import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/UI/Header';
import { HomePage } from './pages/HomePage';
import { PersonPage } from './pages/PersonPage';
import { AddPage } from './pages/AddPage';
import { AboutPage } from './pages/AboutPage';
import { useFamilyStore } from './store/familyStore';

export default function App() {
  const loadFromApi = useFamilyStore((s) => s.loadFromApi);

  useEffect(() => {
    loadFromApi();
  }, [loadFromApi]);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/person/:id" element={<PersonPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
