import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LmnMessageCircleIcon } from 'lumen-icons/message-circle';
import { VoltNativeButton } from '@voltui/components';
import { MoveHoverDirective } from 'angular-movement';

import { injectAppI18n } from '../i18n/inject';
import { whatsappUrl } from '../shared/business';
import { injectScrolledPast } from '../shared/scrolled-past';

/**
 * Floating WhatsApp shortcut (bottom-left) that slides in once the visitor scrolls past the hero.
 * The bottom-right corner belongs to the "back to top" button.
 */
@Component({
  selector: 'app-whatsapp-button',
  imports: [VoltNativeButton, LmnMessageCircleIcon, MoveHoverDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      voltButton
      size="icon"
      [href]="href()"
      target="_blank"
      rel="noopener"
      class="fixed bottom-6 left-6 z-40 size-14 rounded-full shadow-lg shadow-main-900/20 transition-[translate,opacity] duration-500 ease-out"
      [class.translate-y-20]="!visible()"
      [class.opacity-0]="!visible()"
      [class.pointer-events-none]="!visible()"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="visible() ? null : true"
      [attr.aria-label]="i18n.t('nav.whatsapp')"
      [moveWhileHover]="{ scale: [1, 1.06] }"
      [moveSpring]="{ stiffness: 260, damping: 22 }"
    >
      <lmn-message-circle [size]="24" />
    </a>
  `,
})
export class WhatsAppButton {
  readonly message = input.required<string>();

  protected readonly i18n = injectAppI18n();
  protected readonly visible = injectScrolledPast();

  protected href(): string {
    return whatsappUrl(this.message());
  }
}
