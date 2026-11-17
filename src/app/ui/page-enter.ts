import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MoveAnimateDirective } from 'angular-movement';

/**
 * Page entrance: content rises and fades in on the first load. Later navigations are animated by
 * the router's view transition instead, so the entrance is skipped there (no double animation).
 */
@Component({
  selector: 'app-page-enter',
  imports: [MoveAnimateDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div [moveInitial]="initial" [moveAnimate]="{ opacity: 1, y: 0 }" [moveDelay]="200" [moveDuration]="500">
      <ng-content />
    </div>
  `,
})
export class PageEnter {
  /** `navigated` is false until the first navigation has completed. */
  protected readonly initial = inject(Router).navigated ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 };
}
