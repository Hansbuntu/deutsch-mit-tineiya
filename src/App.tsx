import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ProgressProvider } from './lib/progress';
import { Header, BottomNav } from './components/Header';
import { Home } from './pages/Home';
import { Session } from './pages/Session';
import { Progress } from './pages/Progress';
import { PassagePage } from './pages/Passage';
import { SpeakSession } from './pages/SpeakSession';
import { Generator } from './pages/Generator';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="shell">
          <Header />
          <main className="container page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/thema/:topicId" element={<Session />} />
              <Route path="/thema/:topicId/passage" element={<PassagePage />} />
              <Route path="/thema/:topicId/sprechen" element={<SpeakSession />} />
              <Route path="/generieren" element={<Generator />} />
              <Route path="/fortschritt" element={<Progress />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </HashRouter>
    </ProgressProvider>
  );
}

export default App;
