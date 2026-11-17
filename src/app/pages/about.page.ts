import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LmnCalendarIcon } from 'lumen-icons/calendar';
import { LmnHeartIcon } from 'lumen-icons/heart';
import { LmnMessageCircleIcon } from 'lumen-icons/message-circle';
import { LmnSparklesIcon } from 'lumen-icons/sparkles';
import { LmnSunIcon } from 'lumen-icons/sun';
import { VoltBadge, VoltNativeButton } from '@voltui/components';

import { injectAppI18n } from '../i18n/inject';
import { whatsappUrl } from '../shared/business';
import { injectPageSeo } from '../seo/page-seo';
import { PageEnter } from '../ui/page-enter';

@Component({
  selector: 'app-about-page',
  imports: [
    PageEnter,
    RouterLink,
    VoltBadge,
    VoltNativeButton,
    LmnCalendarIcon,
    LmnHeartIcon,
    LmnMessageCircleIcon,
    LmnSparklesIcon,
    LmnSunIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-enter>
      <section class="relative isolate flex min-h-svh items-center overflow-hidden bg-muted px-4 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
        <!-- Soft brand glow behind the content. -->
        <div
          aria-hidden="true"
          class="absolute -top-40 -right-40 -z-10 size-[520px] rounded-full bg-main-200/60 blur-3xl dark:bg-main-900/40"
        ></div>
        <div
          aria-hidden="true"
          class="absolute -bottom-48 -left-32 -z-10 size-[420px] rounded-full bg-main-100 blur-3xl dark:bg-main-950/60"
        ></div>

        <div class="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
          <div
            class="relative"
          >
            <!-- Offset frame: a quiet accent behind the photo. -->
            <div
              aria-hidden="true"
              class="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border-2 border-main-300 dark:border-main-800"
            ></div>
            <img
              src="/14.webp"
              [alt]="t('about.imageAlt')"
              width="1200"
              height="800"
              fetchpriority="high"
              class="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-xl shadow-main-900/10 md:aspect-square"
            />
            <p
              class="absolute -bottom-5 left-4 flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-lg shadow-main-900/10 md:left-8"
            >
              <lmn-heart class="text-main-500" [size]="16" variant="filled" />
              {{ t('shuffleHero.satisfaction') }}
            </p>
          </div>

          <div
            class="flex flex-col items-start"
          >
            <volt-badge variant="secondary" class="mb-4 text-main-700 dark:text-main-300">{{ t('nav.about') }}</volt-badge>
            <h1 class="text-3xl font-bold tracking-tight text-balance text-heading md:text-5xl">{{ t('about.title') }}</h1>
            <p class="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{{ t('about.description') }}</p>

            <ul class="mt-8 grid w-full grid-cols-3 gap-3" role="list">
              @for (item of highlights; track item.key) {
                <li class="flex flex-col items-center gap-2 rounded-2xl bg-surface/70 px-2 py-4 text-center shadow-sm ring-1 ring-border">
                  @switch (item.icon) {
                    @case ('calendar') { <lmn-calendar class="text-main-600 dark:text-main-400" [size]="24" /> }
                    @case ('sparkles') { <lmn-sparkles class="text-main-600 dark:text-main-400" [size]="24" /> }
                    @default { <lmn-sun class="text-main-600 dark:text-main-400" [size]="24" /> }
                  }
                  <span class="text-xs font-medium text-foreground sm:text-sm">{{ t(item.key) }}</span>
                </li>
              }
            </ul>

            <div class="mt-8 flex flex-wrap gap-3">
              <a voltButton size="lg" class="gap-2" [href]="whatsapp()" target="_blank" rel="noopener">
                <lmn-message-circle [size]="20" /> {{ t('shuffleHero.callAction') }}
              </a>
              <a voltButton size="lg" variant="outline" [routerLink]="i18n.path('/prices')">{{ t('shuffleHero.secondaryAction') }}</a>
            </div>
          </div>
        </div>
      </section>
    </app-page-enter>
  `,
})
export default class AboutPage {
  protected readonly i18n = injectAppI18n();
  protected readonly t = this.i18n.t;
  protected readonly highlights = [
    { key: 'shuffleHero.features.0', icon: 'calendar' },
    { key: 'shuffleHero.features.1', icon: 'sparkles' },
    { key: 'shuffleHero.features.2', icon: 'sun' },
  ] as const;

  constructor() {
    injectPageSeo('about');
  }

  protected whatsapp(): string {
    return whatsappUrl(this.t('shuffleHero.actionMessage'));
  }
}
