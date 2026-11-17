import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LmnArrowTopRightOnSquareIcon } from 'lumen-icons/arrow-top-right-on-square';
import { LmnClockIcon } from 'lumen-icons/clock';
import { LmnHomeIcon } from 'lumen-icons/home';
import { LmnMapPinIcon } from 'lumen-icons/map-pin';
import { LmnMessageCircleIcon } from 'lumen-icons/message-circle';
import { LmnPhoneIcon } from 'lumen-icons/phone';
import { VoltBadge, VoltCard, VoltCardContent, VoltNativeButton, VoltSeparator } from '@voltui/components';
import { MoveInViewDirective } from 'angular-movement';

import { injectAppI18n } from '../i18n/inject';
import { BUSINESS, whatsappUrl } from '../shared/business';
import { EASE_OUT } from '../shared/motion';
import { injectPageSeo } from '../seo/page-seo';
import { PageEnter } from '../ui/page-enter';

/**
 * Contact: the facts up front (address, WhatsApp, hours) next to a framed map, instead of a
 * full-screen map with the details hidden behind a popover.
 */
@Component({
  selector: 'app-contact-page',
  imports: [
    PageEnter,
    MoveInViewDirective,
    VoltBadge,
    VoltCard,
    VoltCardContent,
    VoltNativeButton,
    VoltSeparator,
    LmnArrowTopRightOnSquareIcon,
    LmnClockIcon,
    LmnHomeIcon,
    LmnMapPinIcon,
    LmnMessageCircleIcon,
    LmnPhoneIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-enter>
      <section class="relative isolate overflow-hidden px-4 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
        <div
          aria-hidden="true"
          class="absolute -top-48 left-1/2 -z-10 size-[640px] -translate-x-1/2 rounded-full bg-main-100 blur-3xl dark:bg-main-950/70"
        ></div>

        <div class="mx-auto max-w-6xl">
          <header class="mx-auto mb-12 max-w-2xl text-center" moveInView="fade-up">
            <volt-badge variant="secondary" class="mb-4 text-main-700 dark:text-main-300">{{ t('contact.buttonText') }}</volt-badge>
            <h1 class="text-3xl font-bold tracking-tight text-balance text-heading md:text-5xl">{{ t('contactSection.title') }}</h1>
            <p class="mt-4 text-base text-balance text-muted-foreground md:text-lg">{{ t('contactSection.description') }}</p>
          </header>

          <div class="grid gap-6 lg:grid-cols-5">
            <div
              class="flex flex-col gap-4 lg:col-span-2"
              [moveInView]="{ opacity: [0, 1], y: [24, 0] }"
              [moveDuration]="800"
              [moveEasing]="ease"
            >
              <volt-card class="rounded-2xl">
                <volt-card-content class="flex flex-col gap-4 p-5">
                  <a [href]="mapUrl" target="_blank" rel="noopener" class="group flex items-start gap-3 rounded-lg outline-offset-4">
                    <span class="icon"><lmn-map-pin [size]="20" /></span>
                    <span class="flex-1">
                      <span class="block font-medium text-foreground group-hover:underline">{{ t('contact.contact.address') }}</span>
                      <span class="text-sm text-muted-foreground">{{ region }}</span>
                    </span>
                    <lmn-arrow-top-right-on-square class="mt-1 text-muted-foreground" [size]="16" />
                  </a>
                  <volt-separator />
                  <a [href]="whatsapp()" target="_blank" rel="noopener" class="group flex items-center gap-3 rounded-lg outline-offset-4">
                    <span class="icon"><lmn-message-circle [size]="20" /></span>
                    <span class="font-medium text-foreground group-hover:underline">{{ t('contact.contact.whatsapp') }}</span>
                  </a>
                </volt-card-content>
              </volt-card>

              <volt-card class="rounded-2xl">
                <volt-card-content class="flex gap-3 p-5">
                  <span class="icon"><lmn-clock [size]="20" /></span>
                  <div>
                    <h2 class="text-xs font-semibold tracking-widest text-muted-foreground">{{ t('contact.contact.schedule') }}</h2>
                    <p class="mt-2 font-medium text-foreground lowercase first-letter:uppercase">{{ t('contact.contact.weekdayHours') }}</p>
                    <p class="mt-1 font-medium text-foreground lowercase first-letter:uppercase">{{ t('contact.contact.saturdayHours') }}</p>
                  </div>
                </volt-card-content>
              </volt-card>

              <volt-card class="rounded-2xl border-main-200 bg-secondary dark:border-main-900">
                <volt-card-content class="flex items-center gap-3 p-5">
                  <span class="icon"><lmn-home [size]="20" /></span>
                  <p class="font-medium text-secondary-foreground">{{ t('contact.contact.homeService') }}</p>
                </volt-card-content>
              </volt-card>

              <div class="flex flex-wrap gap-3 pt-2">
                <a voltButton size="lg" class="gap-2" [href]="whatsapp()" target="_blank" rel="noopener">
                  <lmn-message-circle [size]="20" /> {{ t('contactSection.whatsapp') }}
                </a>
                <a voltButton size="lg" variant="outline" class="gap-2" [href]="'tel:' + phone">
                  <lmn-phone [size]="20" /> {{ t('contactSection.call') }}
                </a>
              </div>
            </div>

            <div
              class="relative min-h-[360px] overflow-hidden rounded-3xl shadow-xl ring-1 shadow-main-900/10 ring-border lg:col-span-3 lg:min-h-[520px]"
              [moveInView]="{ opacity: [0, 1], y: [32, 0], blur: [8, 0] }"
              [moveDuration]="900"
              [moveDelay]="120"
              [moveEasing]="ease"
            >
              <iframe class="map absolute inset-0 size-full" [title]="t('contact.contact.address')" loading="lazy" [src]="map"></iframe>
            </div>
          </div>
        </div>
      </section>
    </app-page-enter>
  `,
  styles: `
    .icon {
      display: flex;
      flex-shrink: 0;
      align-self: flex-start;
      padding: 0.5rem;
      border-radius: 0.75rem;
      color: var(--color-main-600);
      background: color-mix(in oklch, var(--color-main-500) 12%, transparent);
    }
    :host-context(.dark) .icon {
      color: var(--color-main-300);
    }
    .map {
      border: 0;
      filter: saturate(0.6) contrast(0.95);
    }
    /* Google's embed has no dark style: invert it and turn the hues back. */
    :host-context(.dark) .map {
      filter: invert(0.9) hue-rotate(180deg) saturate(0.5);
    }
  `,
})
export default class ContactPage {
  protected readonly t = injectAppI18n().t;
  protected readonly phone = BUSINESS.phone;
  protected readonly mapUrl = BUSINESS.mapUrl;
  protected readonly region = BUSINESS.address.region;
  protected readonly ease = EASE_OUT;
  // A fixed, trusted Google Maps embed URL.
  protected readonly map = inject(DomSanitizer).bypassSecurityTrustResourceUrl(BUSINESS.mapEmbedUrl);

  constructor() {
    injectPageSeo('contact');
  }

  protected whatsapp(): string {
    return whatsappUrl(this.t('shuffleHero.actionMessage'));
  }
}
