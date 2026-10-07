// Side-effect module: imported first in main.tsx, so the learner's own scripts are in the
// content lists before any other module reads them (e.g. lib/progress.tsx's known card ids).
import { installUserScripts } from './userScripts';

installUserScripts();
