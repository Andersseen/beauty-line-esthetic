import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { LmnMessageCircleIcon } from 'lumen-icons/message-circle';
import { MoveHoverDirective } from 'angular-movement';

import { injectAppI18n } from '../i18n/inject';
import { whatsappUrl } from '../shared/business';

/** Floating WhatsApp shortcut that slides in once the visitor scrolls past the hero. */
@Component({
  selector: 'app-whatsapp-button',
  imports: [LmnMessageCircleIcon, MoveHoverDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <a
      [href]="href()"
      target="_blank"
      rel="noopener"
      class="fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full bg-main-500 p-4 text-white shadow-lg transition-all duration-300 hover:bg-main-600"
      [class.translate-y-16]="!visible()"
      [class.opacity-0]="!visible()"
      [class.pointer-events-none]="!visible()"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-label]="i18n.t('nav.whatsapp')"
      [moveWhileHover]="{ scale: [1, 1.05] }"
    >
      <lmn-message-circle [size]="24" />
    </a>
  `,
})
export class WhatsAppButton {
  readonly message = input.required<string>();

  protected readonly i18n = injectAppI18n();
  protected readonly visible = signal(false);

  protected href(): string {
    return whatsappUrl(this.message());
  }

  protected onScroll(): void {
    this.visible.set(window.scrollY > window.innerHeight * 0.8);
  }
}
