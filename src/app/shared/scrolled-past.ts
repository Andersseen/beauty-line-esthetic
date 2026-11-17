import { afterNextRender, DestroyRef, inject, signal, type Signal } from '@angular/core';

/**
 * `true` while the page is scrolled past `fraction` of the viewport height. Listens passively and
 * only in the browser; the server render (and first frame) report `false`.
 */
export function injectScrolledPast(fraction = 0.8): Signal<boolean> {
  const past = signal(false);
  const destroyRef = inject(DestroyRef);

  afterNextRender(() => {
    const update = () => past.set(window.scrollY > window.innerHeight * fraction);
    window.addEventListener('scroll', update, { passive: true });
    destroyRef.onDestroy(() => window.removeEventListener('scroll', update));
    update();
  });

  return past.asReadonly();
}
