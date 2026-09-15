import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Masthead } from '../components/Masthead';
import { Flashcard } from '../components/Flashcard';
import { DrillPanel } from '../components/DrillPanel';
import { topics, topicById } from '../data/topics';
import { cardsForTopic } from '../data/cards';
import { useProgress } from '../lib/progress';
import { generateDrillForCard } from '../lib/drills';
import { shuffle } from '../lib/text';
import type { VerbCard } from '../data/types';

export function Session() {
  const { topicId = '' } = useParams();
  const navigate = useNavigate();
  const topic = topicById(topicId);
  const { markSeen, markAnswer, notebookPagesDigitized } = useProgress();

  const [cards, setCards] = useState(() => shuffle(cardsForTopic(topicId)));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setCards(shuffle(cardsForTopic(topicId)));
    setIndex(0);
  }, [topicId]);

  const currentCard = cards[index];

  useEffect(() => {
    if (currentCard) markSeen(currentCard.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard?.id]);

  const seenVerbsSoFar = useMemo(
    () => cards.slice(0, index).filter((c): c is VerbCard => c.type === 'verb'),
    [cards, index],
  );

  const drill = useMemo(
    () => (currentCard ? generateDrillForCard(currentCard, seenVerbsSoFar) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCard?.id],
  );

  if (!topic) {
    return (
      <div className="page">
        <Masthead />
        <p className="empty-state">Dieses Thema gibt es nicht.</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="page">
        <Masthead />
        <p className="empty-state">Für dieses Thema gibt es noch keine Karten.</p>
      </div>
    );
  }

  const finished = index >= cards.length;

  return (
    <div className="page">
      <Masthead />

      <div className="stack-label">heutige sitzung</div>
      <div className="topics">
        {topics.map((t) => (
          <Link key={t.id} to={`/thema/${t.id}`} className={`topic${t.id === topicId ? ' active' : ''}`}>
            {t.name}
          </Link>
        ))}
      </div>

      {finished ? (
        <div className="card session-done">
          <h2>Geschafft — {cards.length} Karten aus {topic.name}.</h2>
          <p>Wähle ein neues Thema oder wiederhole dieses noch einmal.</p>
          <div className="card-nav" style={{ justifyContent: 'center' }}>
            <button type="button" className="btn" onClick={() => { setCards(shuffle(cardsForTopic(topicId))); setIndex(0); }}>
              Nochmal
            </button>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
              Zur Übersicht
            </button>
          </div>
        </div>
      ) : (
        <div className="layout">
          <div>
            <Flashcard card={currentCard} index={index} total={cards.length} />
            <div className="card-nav">
              <button type="button" className="btn" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
                Zurück
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setIndex((i) => i + 1)}>
                Weiter
              </button>
            </div>
          </div>

          <div>
            {drill ? (
              <DrillPanel key={drill.id} drill={drill} onAnswer={(correct) => markAnswer(currentCard.id, correct)} />
            ) : (
              <div className="side-card">
                <div className="stack-label">merken</div>
                <p className="note">
                  Für diesen Kartentyp gibt es noch keine Übung — Bild und Wort reichen fürs Erste. Karte weiter für das
                  nächste Wort.
                </p>
              </div>
            )}

            {topicId === 'trennbare-verben' && (
              <div className="side-card">
                <div className="stack-label">aus deinem heft</div>
                <p className="note">
                  Alle {notebookPagesDigitized} trennbaren Verben aus deinem Notizbuch sind jetzt digitalisiert — jede mit
                  eigenem Bild, Beispielsatz und voller Konjugation.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
