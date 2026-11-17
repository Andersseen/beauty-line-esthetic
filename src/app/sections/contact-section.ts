import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VoltNativeButton } from '@voltui/components';
import { LmnMessageCircleIcon } from 'lumen-icons/message-circle';
import { LmnPhoneIcon } from 'lumen-icons/phone';
import { MoveInViewDirective } from 'angular-movement';

import { injectAppI18n } from '../i18n/inject';
import { BUSINESS, whatsappUrl } from '../shared/business';
import { Globe } from './globe';

/** Contact teaser with direct actions; the globe peeks from the bottom right on large screens. */
@Component({
  selector: 'app-contact-section',
  imports: [VoltNativeButton, LmnMessageCircleIcon, LmnPhoneIcon, MoveInViewDirective, Globe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="flex w-full justify-center bg-background py-16 md:py-24 lg:py-32">
      <div class="container mx-auto w-full px-4 lg:px-8">
        <div class="relative h-full w-full space-y-4" moveInView="fade-up">
          <h2 class="text-3xl font-bold tracking-tight text-heading sm:text-4xl md:text-5xl">{{ t('contactSection.title') }}</h2>
          <p class="max-w-xl text-muted-foreground">{{ t('contactSection.description') }}</p>
          <ul class="space-y-2 text-muted-foreground">
            <li>
              <a class="flex items-center gap-2 hover:underline" [href]="whatsapp()" target="_blank" rel="noopener">
                <lmn-message-circle class="text-main-600 dark:text-main-400" [size]="20" />{{ t('contact.contact.whatsapp') }}
              </a>
            </li>
          </ul>
          <div class="flex flex-wrap gap-3 pt-2">
            <a voltButton size="lg" class="gap-2" [href]="whatsapp()" target="_blank" rel="noopener">
              <lmn-message-circle [size]="20" /> {{ t('contactSection.whatsapp') }}
            </a>
            <a voltButton size="lg" variant="outline" class="gap-2" [href]="'tel:' + phone">
              <lmn-phone [size]="20" /> {{ t('contactSection.call') }}
            </a>
          </div>
          <div class="hidden lg:block">
            @defer (on viewport) {
              <app-globe class="pointer-events-none absolute right-0 -bottom-80 md:-right-10 md:-bottom-96" />
            } @placeholder {
              <div class="h-px"></div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactSection {
  protected readonly t = injectAppI18n().t;
  protected readonly phone = BUSINESS.phone;

  protected whatsapp(): string {
    return whatsappUrl(this.t('shuffleHero.actionMessage'));
  }
}
