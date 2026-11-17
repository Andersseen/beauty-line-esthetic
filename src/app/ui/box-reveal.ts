import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MoveVariantsDirective, type MoveVariant } from 'angular-movement';

import { injectInViewOnce } from '../shared/in-view';

/**
 * Reveals its content behind a brand-coloured box that sweeps away when it scrolls into view.
 * Rebuilt from the original Magic UI block on top of Angular Movement variants.
 */
@Component({
  selector: 'app-box-reveal',
  imports: [MoveVariantsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative block w-fit max-w-full overflow-hidden' },
  template: `
    <div
      class="reveal-content"
      [moveVariants]="content()"
      [moveVariant]="visible() ? 'visible' : 'hidden'"
    >
      <ng-content />
    </div>
    <div
      aria-hidden="true"
      class="reveal-box absolute inset-x-0 top-1 bottom-1 z-20"
      [style.background]="boxColor()"
      [moveVariants]="box()"
      [moveVariant]="visible() ? 'visible' : 'hidden'"
    ></div>
  `,
  styles: `
    /* \`translate\`, not \`transform\`: Angular Movement animates the individual property. */
    .reveal-content {
      opacity: 0;
      translate: 0 75px;
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal-content {
        opacity: 1;
        translate: none;
      }
      .reveal-box {
        display: none;
      }
    }
  `,
})
export class BoxReveal {
  readonly boxColor = input('var(--color-main-500)');
  readonly duration = input(300);

  protected readonly visible = injectInViewOnce();

  protected readonly content = computed<Record<string, MoveVariant>>(() => ({
    hidden: { opacity: 0, y: 75, duration: 0 },
    visible: { opacity: 1, y: 0, duration: this.duration(), delay: 250, easing: 'ease-out' },
  }));

  protected readonly box = computed<Record<string, MoveVariant>>(() => ({
    // `left`, not `x`: a percentage `x` is not applied by Angular Movement 1.2 (translate gets no unit).
    hidden: { left: '0%', duration: 0 },
    visible: { left: '100%', duration: this.duration(), easing: 'ease-in' },
  }));
}
