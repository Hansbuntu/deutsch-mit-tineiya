export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'deutsch-mit-tineiya:theme';
const THEME_COLORS: Record<Theme, string> = { light: '#f2ede2', dark: '#0e151d' };

// index.html sets data-theme before first paint (stored choice, else the
// OS preference) so there's no flash; this reads what it chose.
export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // storage unavailable — the choice just won't persist
  }
}
