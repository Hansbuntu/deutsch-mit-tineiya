import { HashRouter, Route, Routes } from 'react-router-dom';
import { ProgressProvider } from './lib/progress';
import { Home } from './pages/Home';
import { Session } from './pages/Session';
import { Progress } from './pages/Progress';
import { PassagePage } from './pages/Passage';

function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thema/:topicId" element={<Session />} />
            <Route path="/thema/:topicId/passage" element={<PassagePage />} />
            <Route path="/fortschritt" element={<Progress />} />
          </Routes>
        </div>
      </HashRouter>
    </ProgressProvider>
  );
}

export default App;
