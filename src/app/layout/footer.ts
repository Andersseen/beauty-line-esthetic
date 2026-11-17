import { ChangeDetectionStrategy, Component, type Type } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { LmnClockIcon } from 'lumen-icons/clock';
import { LmnCreditCardIcon } from 'lumen-icons/credit-card';
import { LmnEnvelopeIcon } from 'lumen-icons/envelope';
import { LmnMapPinIcon } from 'lumen-icons/map-pin';
import { LmnPhoneIcon } from 'lumen-icons/phone';
import { LmnTrophyIcon } from 'lumen-icons/trophy';

import { injectAppI18n, listKey, type AppMessageKey } from '../i18n/inject';
import { sourceCatalog } from '../i18n/i18n';
import { BUSINESS, indicesOf } from '../shared/business';
import { Logo } from './logo';

/** One icon per "useful information" line, in catalog order. */
const INFO_ICONS: readonly Type<unknown>[] = [
  LmnClockIcon,
  LmnClockIcon,
  LmnCreditCardIcon,
  LmnTrophyIcon,
];

const NAV: readonly { label: AppMessageKey; path: string }[] = [
  { label: 'nav.home', path: '/' },
  { label: 'nav.about', path: '/about' },
  { label: 'nav.treatments', path: '/prices' },
  { label: 'nav.contact', path: '/contact' },
];

/**
 * The "curtain" footer: fixed to the bottom of the viewport and uncovered as the page scrolls
 * past it (the clip-path keeps it from showing through earlier).
 */
@Component({
  selector: 'app-footer',
  imports: [NgComponentOutlet, RouterLink, Logo, LmnMapPinIcon, LmnPhoneIcon, LmnEnvelopeIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'relative block h-[860px] sm:h-[720px] md:h-[520px]',
    style: 'clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%)',
  },
  template: `
    <div class="fixed bottom-0 h-[860px] w-full sm:h-[720px] md:h-[520px]">
      <footer
        class="flex size-full bg-gradient-to-br from-main-50 via-main-100 to-main-200 px-4 text-foreground sm:px-6 lg:px-8 dark:from-background dark:via-background dark:to-main-950"
      >
        <div class="mx-auto flex w-full max-w-6xl flex-col justify-end gap-10 pt-12 pb-8">
          <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div class="space-y-4">
              <h2 class="text-2xl font-bold text-heading">{{ t('footer.title') }}</h2>
              <p class="text-muted-foreground">{{ t('footer.description') }}</p>
              <address class="space-y-2 not-italic">
                <a class="link flex items-center gap-2" [href]="mapUrl" target="_blank" rel="noopener">
                  <lmn-map-pin class="shrink-0 text-main-700 dark:text-main-300" [size]="20" />{{ t('footer.address') }}
                </a>
                <a class="link flex items-center gap-2" [href]="'tel:' + phone">
                  <lmn-phone class="shrink-0 text-main-700 dark:text-main-300" [size]="20" />{{ t('footer.phone') }}
                </a>
                <p class="flex items-center gap-2">
                  <lmn-envelope class="shrink-0 text-main-700 dark:text-main-300" [size]="20" />{{ t('footer.email') }}
                </p>
              </address>
            </div>
            <div class="space-y-4">
              <h2 class="text-lg font-semibold text-heading">{{ t('footer.servicesTitle') }}</h2>
              <ul class="space-y-2 text-muted-foreground" role="list">
                @for (i of services; track i) {
                  <li>{{ t(key('footer.servicesList', i)) }}</li>
                }
              </ul>
            </div>
            <div class="space-y-4">
              <h2 class="text-lg font-semibold text-heading">{{ t('footer.infoTitle') }}</h2>
              <ul class="space-y-2 text-muted-foreground" role="list">
                @for (i of info; track i) {
                  <li class="flex items-center gap-2">
                    <span class="flex shrink-0 text-main-700 dark:text-main-300" aria-hidden="true">
                      <ng-container *ngComponentOutlet="icons[i]!; inputs: { size: 20 }" />
                    </span>
                    {{ t(key('footer.infoList', i)) }}
                  </li>
                }
              </ul>
            </div>
          </div>
          <div class="flex flex-col items-center gap-4 border-t border-foreground/15 pt-6 pb-16 md:flex-row md:justify-between md:pr-16 md:pb-0">
            <div class="flex items-center gap-3">
              <span class="flex size-10 items-center justify-center overflow-hidden rounded-full bg-main-500" aria-hidden="true">
                <app-logo class="scale-[0.55]" />
              </span>
              <p class="text-sm text-muted-foreground">© {{ year }} {{ t('footer.copyright') }}</p>
            </div>
            <nav [attr.aria-label]="t('nav.menu')">
              <ul class="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm" role="list">
                @for (link of nav; track link.path) {
                  <li><a class="link" [routerLink]="i18n.path(link.path)">{{ t(link.label) }}</a></li>
                }
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: `
    .link {
      border-radius: 0.25rem;
      text-underline-offset: 4px;
      transition: color 0.2s;
    }
    .link:hover {
      color: var(--color-main-700);
      text-decoration: underline;
    }
    :host-context(.dark) .link:hover {
      color: var(--color-main-300);
    }
    .link:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 3px;
    }
  `,
})
export class Footer {
  protected readonly i18n = injectAppI18n();
  protected readonly t = this.i18n.t;
  protected readonly key = listKey;
  protected readonly year = new Date().getFullYear();
  protected readonly services = indicesOf(sourceCatalog.footer.servicesList);
  protected readonly info = indicesOf(sourceCatalog.footer.infoList);
  protected readonly icons = INFO_ICONS;
  protected readonly nav = NAV;
  protected readonly phone = BUSINESS.phone;
  protected readonly mapUrl = BUSINESS.mapUrl;
}
