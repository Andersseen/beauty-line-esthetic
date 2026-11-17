import { afterNextRender, DestroyRef, ElementRef, inject, signal, type Signal } from '@angular/core';

/**
 * `true` once the host element has entered the viewport (one-shot). Server render and the first
 * browser frame report `false`, so the hidden state is what hydrates.
 */
export function injectInViewOnce(rootMargin = '0px 0px -10% 0px'): Signal<boolean> {
  const host = inject<ElementRef<HTMLElement>>(ElementRef);
  const visible = signal(false);
  let observer: IntersectionObserver | undefined;

  afterNextRender(() => {
    if (typeof IntersectionObserver === 'undefined') {
      visible.set(true);
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          visible.set(true);
          observer?.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(host.nativeElement);
  });

  inject(DestroyRef).onDestroy(() => observer?.disconnect());

  return visible.asReadonly();
}
