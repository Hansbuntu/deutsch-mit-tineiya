import { lazy, Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ProgressProvider } from './lib/progress';
import { Header, BottomNav } from './components/Header';
import { Home } from './pages/Home';

// Home ships with the first load; every other screen downloads the first time it's opened.
const Session = lazy(() => import('./pages/Session').then((m) => ({ default: m.Session })));
const Progress = lazy(() => import('./pages/Progress').then((m) => ({ default: m.Progress })));
const PassagePage = lazy(() => import('./pages/Passage').then((m) => ({ default: m.PassagePage })));
const SpeakSession = lazy(() => import('./pages/SpeakSession').then((m) => ({ default: m.SpeakSession })));
const Generator = lazy(() => import('./pages/Generator').then((m) => ({ default: m.Generator })));
const Review = lazy(() => import('./pages/Review').then((m) => ({ default: m.Review })));
const Words = lazy(() => import('./pages/Words').then((m) => ({ default: m.Words })));

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
            <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/thema/:topicId" element={<Session />} />
                <Route path="/thema/:topicId/passage" element={<PassagePage />} />
                <Route path="/thema/:topicId/sprechen" element={<SpeakSession />} />
                <Route path="/wiederholen" element={<Review />} />
                <Route path="/generieren" element={<Generator />} />
                <Route path="/woerter" element={<Words />} />
                <Route path="/fortschritt" element={<Progress />} />
              </Routes>
            </Suspense>
          </main>
          <BottomNav />
        </div>
      </HashRouter>
    </ProgressProvider>
  );
}

export default App;
