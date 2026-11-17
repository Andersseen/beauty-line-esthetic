import type { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

function leaf(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  let node = snapshot;
  while (node.firstChild) node = node.firstChild;
  return node;
}

/**
 * Page changes animate (see `::view-transition-*` in styles.css) only between different pages:
 * an in-page anchor or a query change, and visitors who prefer reduced motion, skip it.
 */
export function onPageTransition({ transition, from, to }: ViewTransitionInfo): void {
  const reduce = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce || leaf(from).routeConfig === leaf(to).routeConfig) {
    transition.skipTransition();
  }
}
