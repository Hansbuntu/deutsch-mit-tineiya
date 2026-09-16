import { HashRouter, Route, Routes } from 'react-router-dom';
import { ProgressProvider } from './lib/progress';
import { Home } from './pages/Home';
import { Session } from './pages/Session';
import { Progress } from './pages/Progress';
import { PassagePage } from './pages/Passage';
import { SpeakSession } from './pages/SpeakSession';
import { Generator } from './pages/Generator';

function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thema/:topicId" element={<Session />} />
            <Route path="/thema/:topicId/passage" element={<PassagePage />} />
            <Route path="/thema/:topicId/sprechen" element={<SpeakSession />} />
            <Route path="/generieren" element={<Generator />} />
            <Route path="/fortschritt" element={<Progress />} />
          </Routes>
        </div>
      </HashRouter>
    </ProgressProvider>
  );
}

export default App;
