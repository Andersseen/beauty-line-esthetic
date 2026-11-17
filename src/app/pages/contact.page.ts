import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  VoltCard,
  VoltCardContent,
  VoltCardHeader,
  VoltNativeButton,
  VoltPopoverContent,
  VoltPopoverTrigger,
  VoltSeparator,
} from '@voltui/components';

import { injectAppI18n } from '../i18n/inject';
import { BUSINESS } from '../shared/business';
import { injectPageSeo } from '../seo/page-seo';
import { PageEnter } from '../ui/page-enter';

@Component({
  selector: 'app-contact-page',
  imports: [PageEnter, VoltNativeButton, VoltPopoverTrigger, VoltPopoverContent, VoltCard, VoltCardHeader, VoltCardContent, VoltSeparator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-enter>
      <section class="min-h-screen w-full shadow-lg">
        <h1 class="sr-only">{{ t('seo.contact.title') }}</h1>
        <div class="relative flex min-h-screen justify-end pt-10">
          <div class="absolute inset-0 pt-20 contrast-50 saturate-50">
            <iframe class="size-full" title="map" loading="lazy" [src]="map"></iframe>
          </div>
          <div class="relative p-16 pt-28">
            <button voltButton type="button" size="lg" variant="outline" class="bg-pink-50 shadow-lg" [voltPopover]="card" placement="bottom">
              {{ t('contact.buttonText') }}
            </button>
          </div>
        </div>
      </section>
    </app-page-enter>

    <ng-template #card>
      <volt-popover-content class="max-w-[400px] p-0">
        <volt-card class="rounded-lg border-0 bg-neutral-100 shadow-none">
          <volt-card-header class="flex flex-col gap-1">
            <p class="text-base">{{ t('contact.contact.address') }}</p>
            <p class="text-sm">{{ t('contact.contact.whatsapp') }}</p>
          </volt-card-header>
          <volt-separator />
          <volt-card-content class="flex flex-col pt-4">
            <p class="text-base">{{ t('contact.contact.schedule') }}</p>
            <p class="text-sm">{{ t('contact.contact.weekdayHours') }}</p>
            <p class="text-base">{{ t('contact.contact.saturdayHours') }}</p>
            <p class="text-sm">{{ t('contact.contact.homeService') }}</p>
          </volt-card-content>
        </volt-card>
      </volt-popover-content>
    </ng-template>
  `,
})
export default class ContactPage {
  protected readonly t = injectAppI18n().t;
  // A fixed, trusted Google Maps embed URL.
  protected readonly map = inject(DomSanitizer).bypassSecurityTrustResourceUrl(BUSINESS.mapEmbedUrl);

  constructor() {
    injectPageSeo('contact');
  }
}
