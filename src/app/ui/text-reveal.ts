import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MoveVariantsDirective, type MoveVariant } from 'angular-movement';

import { EASE_OUT } from '../shared/motion';
import { injectInViewOnce } from '../shared/in-view';

/**
 * Text that rises softly into place, un-blurring as it goes, once it scrolls into view.
 * Replaces the original Magic UI "box reveal" (a brand-coloured box sweeping off the text).
 */
@Component({
  selector: 'app-text-reveal',
  imports: [MoveVariantsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block max-w-full' },
  template: `
    <div class="reveal" [moveVariants]="variants()" [moveVariant]="visible() ? 'visible' : 'hidden'">
      <ng-content />
    </div>
  `,
  styles: `
    /* Pre-hydration state. \`translate\`, not \`transform\`: Angular Movement animates the
       individual property. */
    .reveal {
      opacity: 0;
      translate: 0 18px;
      filter: blur(6px);
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal {
        opacity: 1 !important;
        translate: none !important;
        filter: none !important;
      }
    }
  `,
})
export class TextReveal {
  /** Extra delay (ms), to stagger a title, its paragraph and a list. */
  readonly delay = input(0);
  readonly duration = input(800);

  protected readonly visible = injectInViewOnce();

  protected readonly variants = computed<Record<string, MoveVariant>>(() => ({
    hidden: { opacity: 0, y: 18, blur: 6, duration: 0 },
    visible: { opacity: 1, y: 0, blur: 0, duration: this.duration(), delay: this.delay(), easing: EASE_OUT },
  }));
}
