import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveAnimateDirective } from 'angular-movement';

/** Page entrance: content rises and fades in, like the original page transition wrapper. */
@Component({
  selector: 'app-page-enter',
  imports: [MoveAnimateDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div [moveInitial]="{ opacity: 0, y: 25 }" [moveAnimate]="{ opacity: 1, y: 0 }" [moveDelay]="200" [moveDuration]="500">
      <ng-content />
    </div>
  `,
})
export class PageEnter {}
