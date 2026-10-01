import type { SentenceCard } from './types';

// The past tense people actually speak — Perfekt: haben or sein + past participle.
// Each line feeds two drills (which helper verb? which participle?) with a hand-picked
// trap for each, so the wrong options are the mistakes learners really make.
// The last group retells Tineiya's "Mein Tag" script as yesterday.
//
// Row: [id, German, English, helper verb as used, the other helper (same person),
//       participle, tempting wrong participle, infinitive]
type Row = [string, string, string, string, string, string, string, string];

const GENERAL: Row[] = [
  // haben — most verbs
  ['pizza', 'Ich habe gestern Pizza gegessen.', 'I ate pizza yesterday.', 'habe', 'bin', 'gegessen', 'geesst', 'essen'],
  ['film', 'Wir haben einen Film gesehen.', 'We watched a film.', 'haben', 'sind', 'gesehen', 'gesiehst', 'sehen'],
  ['wasser', 'Du hast viel Wasser getrunken.', 'You drank a lot of water.', 'hast', 'bist', 'getrunken', 'getrinkt', 'trinken'],
  ['buch', 'Sie hat ein Buch gelesen.', 'She read a book.', 'hat', 'ist', 'gelesen', 'geliest', 'lesen'],
  ['deutsch', 'Ich habe Deutsch gelernt.', 'I studied German.', 'habe', 'bin', 'gelernt', 'gelernen', 'lernen'],
  ['email', 'Er hat eine E-Mail geschrieben.', 'He wrote an email.', 'hat', 'ist', 'geschrieben', 'geschreibt', 'schreiben'],
  ['einkaufen', 'Wir haben im Supermarkt eingekauft.', 'We went shopping at the supermarket.', 'haben', 'sind', 'eingekauft', 'geeinkauft', 'einkaufen'],
  ['anrufen', 'Ich habe meine Mutter angerufen.', 'I called my mother.', 'habe', 'bin', 'angerufen', 'geanruft', 'anrufen'],
  ['aufraeumen', 'Ihr habt die Wohnung aufgeräumt.', 'You all tidied the flat.', 'habt', 'seid', 'aufgeräumt', 'geaufräumt', 'aufräumen'],
  ['verstehen', 'Ich habe das nicht verstanden.', "I didn't understand that.", 'habe', 'bin', 'verstanden', 'geverstanden', 'verstehen'],
  ['musik', 'Sie haben Musik gehört.', 'They listened to music.', 'haben', 'sind', 'gehört', 'gehören', 'hören'],
  ['passwort', 'Ich habe mein Passwort vergessen.', 'I forgot my password.', 'habe', 'bin', 'vergessen', 'gevergesst', 'vergessen'],
  ['kochen', 'Er hat das Abendessen gekocht.', 'He cooked dinner.', 'hat', 'ist', 'gekocht', 'gekochen', 'kochen'],
  ['fussball', 'Wir haben Fußball gespielt.', 'We played football.', 'haben', 'sind', 'gespielt', 'gespielen', 'spielen'],
  ['besuchen', 'Ich habe meine Freundin besucht.', 'I visited my friend.', 'habe', 'bin', 'besucht', 'gebesucht', 'besuchen'],
  // sein — movement and change of state
  ['berlin', 'Ich bin nach Berlin gefahren.', 'I went to Berlin.', 'bin', 'habe', 'gefahren', 'gefahrt', 'fahren'],
  ['kino', 'Wir sind ins Kino gegangen.', 'We went to the cinema.', 'sind', 'haben', 'gegangen', 'gegeht', 'gehen'],
  ['spaet', 'Sie ist zu spät gekommen.', 'She came too late.', 'ist', 'hat', 'gekommen', 'gekommt', 'kommen'],
  ['spanien', 'Du bist nach Spanien geflogen.', 'You flew to Spain.', 'bist', 'hast', 'geflogen', 'gefliegt', 'fliegen'],
  ['zuhause', 'Ich bin zu Hause geblieben.', 'I stayed at home.', 'bin', 'habe', 'geblieben', 'gebleibt', 'bleiben'],
  ['passiert', 'Was ist passiert?', 'What happened?', 'ist', 'hat', 'passiert', 'gepassiert', 'passieren'],
  ['umziehen', 'Er ist letztes Jahr umgezogen.', 'He moved house last year.', 'ist', 'hat', 'umgezogen', 'geumzieht', 'umziehen'],
  ['urlaub', 'Wir sind im Urlaub gewesen.', 'We were on holiday.', 'sind', 'haben', 'gewesen', 'geseint', 'sein'],
  ['baby', 'Das Baby ist schnell eingeschlafen.', 'The baby fell asleep quickly.', 'ist', 'hat', 'eingeschlafen', 'geeinschlaft', 'einschlafen'],
];

const MEIN_TAG: Row[] = [
  ['tag-aufstehen', 'Gestern bin ich um sieben Uhr aufgestanden.', 'Yesterday I got up at seven o’clock.', 'bin', 'habe', 'aufgestanden', 'aufgesteht', 'aufstehen'],
  ['tag-bad', 'Dann bin ich ins Badezimmer gegangen.', 'Then I went to the bathroom.', 'bin', 'habe', 'gegangen', 'gegeht', 'gehen'],
  ['tag-waschen', 'Ich habe mein Gesicht gewaschen.', 'I washed my face.', 'habe', 'bin', 'gewaschen', 'gewascht', 'waschen'],
  ['tag-fruehstueck', 'Danach habe ich gefrühstückt.', 'After that I had breakfast.', 'habe', 'bin', 'gefrühstückt', 'gefrühstücken', 'frühstücken'],
  ['tag-arbeit', 'Um acht Uhr bin ich zur Arbeit gefahren.', 'At eight o’clock I went to work.', 'bin', 'habe', 'gefahren', 'gefahrt', 'fahren'],
  ['tag-kollegen', 'Bei der Arbeit habe ich mit meinen Kollegen gesprochen.', 'At work I talked to my colleagues.', 'habe', 'bin', 'gesprochen', 'gesprecht', 'sprechen'],
  ['tag-abend', 'Am Abend habe ich Musik gehört.', 'In the evening I listened to music.', 'habe', 'bin', 'gehört', 'gehören', 'hören'],
  ['tag-bett', 'Um zehn Uhr bin ich ins Bett gegangen.', 'At ten o’clock I went to bed.', 'bin', 'habe', 'gegangen', 'gegeht', 'gehen'],
];

const toCard = ([id, de, en, auxiliary, wrongAuxiliary, participle, wrongParticiple, infinitive]: Row): SentenceCard => ({
  id: `perfekt-${id}`,
  type: 'sentence',
  partOfSpeech: 'phrase',
  topicIds: ['perfekt'],
  source: 'curated',
  level: 'A2',
  image: { kind: 'icon', icon: 'return-arrow' },
  de,
  en,
  emphasis: participle,
  perfekt: { infinitive, auxiliary, wrongAuxiliary, participle, wrongParticiple },
});

export const perfektSentences: SentenceCard[] = [...GENERAL, ...MEIN_TAG].map(toCard);
