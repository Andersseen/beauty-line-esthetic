import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Page entrance on the first load: content rises and fades in. Plain CSS, not Angular Movement, so
 * it starts with the prerendered HTML instead of waiting for JavaScript (a JS-driven hidden state
 * held first paint until hydration). Later navigations are animated by the router's view
 * transition, so the entrance is skipped there.
 */
@Component({
  selector: 'app-page-enter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block', '[class.enter]': 'firstLoad' },
  template: `<ng-content />`,
  styles: `
    :host.enter {
      animation: page-enter 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both;
    }
    @keyframes page-enter {
      from {
        opacity: 0.01;
        translate: 0 24px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host.enter {
        animation: none;
      }
    }
  `,
})
export class PageEnter {
  /** `navigated` is false until the first navigation has completed (always so on the server). */
  protected readonly firstLoad = !inject(Router).navigated;
}
