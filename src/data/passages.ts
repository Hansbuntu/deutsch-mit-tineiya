import type { Passage } from './types';

// Full TikTok scripts, kept verbatim as continuous reading/memorization
// passages — separate from the flashcards and drills extracted from them
// in tiktokVocab.ts and coreSentences.ts.
export const passages: Passage[] = [
  {
    id: 'mein-tag',
    topicId: 'mein-tag',
    title: 'Mein Tag',
    paragraphs: [
      'Ich heiße Tineiya. Ich wohne in Deutschland. Ich lerne Deutsch.',
      'Jeden Morgen stehe ich um sieben Uhr auf. Dann gehe ich ins Badezimmer. Ich wasche mein Gesicht und putze meine Zähne.',
      'Danach frühstücke ich. Ich esse Brot und Käse. Ich trinke Kaffee oder Wasser.',
      'Um acht Uhr gehe ich zur Arbeit. Ich fahre mit dem Bus. Bei der Arbeit spreche ich mit meinen Kollegen.',
      'Am Mittag esse ich etwas. Danach arbeite ich weiter.',
      'Am Abend gehe ich nach Hause. Ich koche Essen und höre Musik. Manchmal sehe ich einen Film.',
      'Um zehn Uhr gehe ich ins Bett. Ich bin müde. Ich schlafe gut.',
      'Morgen ist ein neuer Tag.',
    ],
  },
  {
    id: 'mein-zuhause',
    topicId: 'mein-zuhause',
    title: 'Mein Zuhause',
    paragraphs: [
      'Ich wohne in Ghana. Mein Zuhause ist ein wichtiger Ort für mich.',
      'Ich habe ein Zimmer. In meinem Zimmer habe ich ein Bett, einen Tisch und einen Stuhl. Auf meinem Tisch sind meine Bücher, mein Handy und meine Kunstsachen.',
      'In meinem Zimmer gibt es auch viele Bilder. Einige Bilder habe ich selbst gemalt. Meine Kamera ist auch in meinem Zimmer, weil ich gern fotografiere.',
      'Neben meinem Tisch ist mein Bett. Vor meinem Bett ist ein kleiner Platz. Dort sitze ich manchmal und höre Musik oder denke nach.',
      'Ich verbringe viel Zeit in meinem Zimmer. Ich male, schreibe, höre Musik und arbeite an meinen Ideen.',
      'Mein Zimmer ist nicht perfekt, aber ich mag es. Es ist ein Ort, an dem ich kreativ sein kann.',
      'Hier fühle ich mich zu Hause.',
    ],
  },
  {
    id: 'ueber-mich',
    topicId: 'ueber-mich',
    title: 'Über mich',
    paragraphs: [
      'Ich heiße Tineiya und ich bin 23 Jahre alt. Ich komme aus Ghana und wohne in Ghana. Ich lerne Deutsch.',
      'Ich bin Künstler. Ich mache Kunst, weil ich mich gern ausdrücke. Kunst ist ein wichtiger Teil von meinem Leben. Ich male gern und ich arbeite oft an neuen Ideen.',
      'Ich mache auch Musik. Ich schreibe und fotografiere gern. Kreativität ist für mich sehr wichtig. Ich mag es, neue Dinge zu machen und neue Ideen zu haben.',
      'In meiner Freizeit schaue ich gern YouTube-Videos. Ich höre Musik und manchmal arbeite ich auch an meiner Kunst.',
      'Ich lerne Deutsch, weil ich die Sprache interessant finde. Ich möchte Deutsch sprechen und besser verstehen. Mein Ziel ist, nach Deutschland zu reisen und dort zu leben.',
      'Ich weiß, dass Deutsch nicht immer einfach ist, aber ich lerne jeden Tag. Ich möchte neue Wörter lernen und mehr Deutsch sprechen.',
      'Das bin ich.',
    ],
  },
  {
    id: 'mein-leben',
    topicId: 'mein-leben',
    title: 'Mein Leben',
    paragraphs: [
      'Mein Leben ist kreativ. Jeden Tag mache ich verschiedene Dinge. Ich male, schreibe, mache Musik und fotografiere. Ich verbringe viel Zeit mit meiner Kunst.',
      'Ich arbeite an Bildern und habe oft neue Ideen. Ich bin gern in meinem Zimmer. Dort kann ich malen, Musik hören und arbeiten.',
      'Manchmal gehe ich raus und mache Fotos. Ich sehe Menschen, Häuser und viele verschiedene Dinge.',
      'In meiner Freizeit höre ich Musik und schaue YouTube-Videos. Musik ist auch ein wichtiger Teil von meinem Leben.',
      'Im Moment lerne ich Deutsch. Ich lerne neue Wörter und versuche, mehr zu sprechen.',
      'Ich weiß noch nicht, wie mein Leben in der Zukunft aussieht. Aber ich möchte weiter Kunst machen, Musik machen und neue Dinge lernen. Ich möchte nach Deutschland reisen und dort leben.',
      'Das ist mein Leben.',
    ],
  },
];

export const passageForTopic = (topicId: string): Passage | undefined =>
  passages.find((p) => p.topicId === topicId);
