import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnArrowUpIcon } from 'lumen-icons/arrow-up';
import { VoltNativeButton } from '@voltui/components';
import { MoveHoverDirective } from 'angular-movement';

import { injectAppI18n } from '../i18n/inject';
import { injectScrolledPast } from '../shared/scrolled-past';

/** Floating "back to top" button (bottom-right), shown once the visitor has scrolled a screen. */
@Component({
  selector: 'app-scroll-top-button',
  imports: [VoltNativeButton, LmnArrowUpIcon, MoveHoverDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      voltButton
      variant="outline"
      size="icon"
      type="button"
      class="fixed right-6 bottom-6 z-40 size-12 rounded-full border-border bg-surface/80 text-heading shadow-lg shadow-main-900/15 backdrop-blur transition-[translate,opacity] duration-500 ease-out"
      [class.translate-y-20]="!visible()"
      [class.opacity-0]="!visible()"
      [class.pointer-events-none]="!visible()"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="visible() ? null : true"
      [attr.aria-label]="i18n.t('nav.scrollTop')"
      [moveWhileHover]="{ y: [0, -3] }"
      [moveSpring]="{ stiffness: 260, damping: 22 }"
      (click)="toTop()"
    >
      <lmn-arrow-up [size]="20" />
    </button>
  `,
})
export class ScrollTopButton {
  protected readonly i18n = injectAppI18n();
  protected readonly visible = injectScrolledPast();

  protected toTop(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
