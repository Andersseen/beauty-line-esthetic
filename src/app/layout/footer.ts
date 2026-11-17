import { ChangeDetectionStrategy, Component, type Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { LmnClockIcon } from 'lumen-icons/clock';
import { LmnCreditCardIcon } from 'lumen-icons/credit-card';
import { LmnEnvelopeIcon } from 'lumen-icons/envelope';
import { LmnMapPinIcon } from 'lumen-icons/map-pin';
import { LmnPhoneIcon } from 'lumen-icons/phone';
import { LmnTrophyIcon } from 'lumen-icons/trophy';

import { injectAppI18n, listKey } from '../i18n/inject';
import { sourceCatalog } from '../i18n/i18n';
import { indicesOf } from '../shared/business';

/** One icon per "useful information" line, in catalog order. */
const INFO_ICONS: readonly Type<unknown>[] = [
  LmnClockIcon,
  LmnClockIcon,
  LmnCreditCardIcon,
  LmnTrophyIcon,
];

/**
 * The "curtain" footer: fixed to the bottom of the viewport and uncovered as the page scrolls
 * past it (the clip-path keeps it from showing through earlier).
 */
@Component({
  selector: 'app-footer',
  imports: [NgComponentOutlet, LmnMapPinIcon, LmnPhoneIcon, LmnEnvelopeIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative block h-[800px]', style: 'clip-path: polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' },
  template: `
    <div class="fixed bottom-0 h-[800px] w-full">
      <footer
        class="flex size-full items-center justify-center bg-gradient-to-br from-main-100 to-main-300 px-4 dark:from-background dark:to-main-950 sm:px-6 lg:px-8"
      >
        <div class="flex h-full w-full max-w-7xl flex-col justify-between py-12">
          <div class="mt-56 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div class="space-y-4">
              <h3 class="text-2xl font-bold text-foreground">{{ t('footer.title') }}</h3>
              <p class="text-muted-foreground">{{ t('footer.description') }}</p>
              <div class="space-y-2 text-muted-foreground">
                <div class="flex items-center">
                  <lmn-map-pin class="mr-2 text-main-600 dark:text-main-400" [size]="20" />{{ t('footer.address') }}
                </div>
                <div class="flex items-center">
                  <lmn-phone class="mr-2 text-main-600 dark:text-main-400" [size]="20" />{{ t('footer.phone') }}
                </div>
                <div class="flex items-center">
                  <lmn-envelope class="mr-2 text-main-600 dark:text-main-400" [size]="20" />{{ t('footer.email') }}
                </div>
              </div>
            </div>
            <div class="hidden space-y-4 md:block">
              <h4 class="text-lg font-semibold text-foreground">{{ t('footer.servicesTitle') }}</h4>
              <ul class="space-y-2 text-muted-foreground">
                @for (i of services; track i) {
                  <li>{{ t(key('footer.servicesList', i)) }}</li>
                }
              </ul>
            </div>
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-foreground">{{ t('footer.infoTitle') }}</h4>
              <ul class="space-y-2 text-muted-foreground">
                @for (i of info; track i) {
                  <li class="flex items-center">
                    <span class="mr-2 flex text-main-600 dark:text-main-400">
                      <ng-container *ngComponentOutlet="icons[i]!; inputs: { size: 20 }" />
                    </span>
                    {{ t(key('footer.infoList', i)) }}
                  </li>
                }
              </ul>
            </div>
          </div>
          <div class="border-t border-foreground/10 pt-8">
            <p class="text-center text-muted-foreground">© {{ year }} {{ t('footer.copyright') }}</p>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class Footer {
  protected readonly t = injectAppI18n().t;
  protected readonly key = listKey;
  protected readonly year = new Date().getFullYear();
  protected readonly services = indicesOf(sourceCatalog.footer.servicesList);
  protected readonly info = indicesOf(sourceCatalog.footer.infoList);
  protected readonly icons = INFO_ICONS;
}
