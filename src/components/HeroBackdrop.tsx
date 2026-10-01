import { lazy, Suspense, useEffect, useState } from 'react';
import type { GradientWavesProps } from './GradientWaves';

// The 3D shader (and ogl) download only when the backdrop actually renders.
const GradientWaves = lazy(() => import('./GradientWaves'));

/**
 * Brand colours for the waves. Strength is set so that, together with the wash behind
 * the hero intro, every piece of text clears WCAG AA even over the darkest wave colour.
 */
const PALETTES: Record<
  'light' | 'dark',
  Pick<GradientWavesProps, 'horizonColor' | 'waveColor' | 'crestColor' | 'opacity' | 'brightness'>
> = {
  light: { horizonColor: '#c3d2c8', waveColor: '#56806b', crestColor: '#d6a85a', opacity: 0.6, brightness: 1 },
  dark: { horizonColor: '#1c2a33', waveColor: '#46685c', crestColor: '#c9963c', opacity: 0.6, brightness: 0.95 },
};

function useMedia(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/** Follows the app's light/dark switch (data-theme on <html>). */
function useTheme(): 'light' | 'dark' {
  const read = (): 'light' | 'dark' => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  const [theme, setTheme] = useState(read);
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

function webgl2Available(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

/**
 * Animated brand waves behind the top of a tab page (Home's hero, or a tab's header band);
 * a static gradient where WebGL2 isn't available.
 */
export function HeroBackdrop({ className = 'hero-waves' }: { className?: string }) {
  const theme = useTheme();
  const reduceMotion = useMedia('(prefers-reduced-motion: reduce)');
  const phone = useMedia('(max-width: 720px)');
  const finePointer = useMedia('(pointer: fine)');
  const [canRender] = useState(webgl2Available);

  return (
    <div className={`page-waves ${className}`} aria-hidden="true">
      {canRender && (
        <Suspense fallback={null}>
          <GradientWaves
            {...PALETTES[theme]}
            speed={0.25}
            amplitude={3}
            waveScale={0.7}
            tilt={0.98}
            height={6}
            fogDepth={42}
            detail={phone ? 'low' : 'medium'}
            maxDpr={phone ? 1 : 1.5}
            animate={!reduceMotion}
            mouseInteraction={finePointer && !reduceMotion}
            parallaxStrength={0.35}
            grain
            grainIntensity={0.035}
          />
        </Suspense>
      )}
    </div>
  );
}
