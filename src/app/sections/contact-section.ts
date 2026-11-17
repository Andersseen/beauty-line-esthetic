import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnEnvelopeIcon } from 'lumen-icons/envelope';
import { LmnPhoneIcon } from 'lumen-icons/phone';

import { injectAppI18n } from '../i18n/inject';
import { Globe } from './globe';

/** Desktop-only contact teaser with the globe peeking from the bottom right. */
@Component({
  selector: 'app-contact-section',
  imports: [LmnEnvelopeIcon, LmnPhoneIcon, Globe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="flex w-full justify-center bg-background py-12 md:py-24 lg:py-32">
      <div class="w-full px-4 md:px-6">
        <div class="relative hidden h-full w-full space-y-4 lg:block">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{{ t('contactSection.title') }}</h2>
          <p class="text-gray-500">{{ t('contactSection.description') }}</p>
          <ul class="space-y-2">
            <li class="flex items-center"><lmn-envelope class="mr-2 text-main-600" [size]="20" />{{ t('contactSection.contactInfo.0') }}</li>
            <li class="flex items-center"><lmn-phone class="mr-2 text-main-600" [size]="20" />{{ t('contactSection.contactInfo.1') }}</li>
          </ul>
          @defer (on viewport) {
            <app-globe class="absolute right-0 -bottom-80 md:-right-10 md:-bottom-96" />
          } @placeholder {
            <div class="h-px"></div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactSection {
  protected readonly t = injectAppI18n().t;
}
