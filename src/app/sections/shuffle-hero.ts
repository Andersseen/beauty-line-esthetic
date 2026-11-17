import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { LmnCalendarIcon } from 'lumen-icons/calendar';
import { LmnHeartIcon } from 'lumen-icons/heart';
import { LmnMessageCircleIcon } from 'lumen-icons/message-circle';
import { LmnSparklesIcon } from 'lumen-icons/sparkles';
import { LmnSunIcon } from 'lumen-icons/sun';
import { RouterLink } from '@angular/router';
import { VoltBadge, VoltCard, VoltNativeButton } from '@voltui/components';
import { MoveLayoutDirective } from 'angular-movement';

import { injectAppI18n } from '../i18n/inject';
import { whatsappUrl } from '../shared/business';

interface Square {
  readonly id: number;
  readonly src: string;
}

const SQUARES: readonly Square[] = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  src: `/hero/${String(i + 1).padStart(2, '0')}.webp`,
}));

function shuffled(items: readonly Square[]): Square[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

/**
 * Hero with a 4×4 photo grid that reshuffles every three seconds. Each tile animates to its new
 * cell with Angular Movement's layout (FLIP) transition, spring-driven like the original.
 */
@Component({
  selector: 'app-shuffle-hero',
  imports: [RouterLink, VoltBadge, VoltCard, VoltNativeButton, LmnCalendarIcon, LmnSparklesIcon, LmnSunIcon, LmnHeartIcon, LmnMessageCircleIcon, MoveLayoutDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 pt-28 pb-12 md:grid-cols-2">
      <div>
        <volt-badge variant="secondary" class="mb-4 text-main-700">{{ t('shuffleHero.tagline') }}</volt-badge>
        <h1 class="text-3xl font-semibold tracking-tight text-balance text-main-950 md:text-4xl lg:text-5xl">{{ t('shuffleHero.title') }}</h1>

        <div class="flex justify-center gap-8 pt-6 lg:justify-start">
          <div class="flex flex-col items-center">
            <lmn-calendar class="text-main-600" [size]="32" />
            <span class="mt-2 text-sm text-gray-600">{{ t('shuffleHero.features.0') }}</span>
          </div>
          <div class="flex flex-col items-center">
            <lmn-sparkles class="text-main-600" [size]="32" />
            <span class="mt-2 text-sm text-gray-600">{{ t('shuffleHero.features.1') }}</span>
          </div>
          <div class="flex flex-col items-center">
            <lmn-sun class="text-main-600" [size]="32" />
            <span class="mt-2 text-sm text-gray-600">{{ t('shuffleHero.features.2') }}</span>
          </div>
        </div>

        <div class="flex flex-col items-start gap-4">
          <volt-card class="mt-6 flex w-fit flex-row items-center gap-3 border-main-200 bg-main-50 px-4 py-3">
            <lmn-heart class="text-main-500" [size]="24" />
            <span class="font-medium text-neutral-900">{{ t('shuffleHero.satisfaction') }}</span>
          </volt-card>
          <div class="flex flex-wrap gap-3">
            <a voltButton size="lg" class="gap-2" [href]="whatsapp()" target="_blank" rel="noopener">
              <lmn-message-circle [size]="20" /> {{ t('shuffleHero.callAction') }}
            </a>
            <a voltButton size="lg" variant="outline" [routerLink]="i18n.path('/prices')">{{ t('shuffleHero.secondaryAction') }}</a>
          </div>
        </div>
      </div>

      <div class="grid h-[450px] grid-cols-4 grid-rows-4 gap-1" aria-hidden="true">
        @for (square of squares(); track square.id) {
          <div
            class="size-full rounded-lg bg-cover bg-center"
            [style.background-image]="'url(' + square.src + ')'"
            moveLayout
            [moveSpring]="{ stiffness: 120, damping: 16 }"
          ></div>
        }
      </div>
    </section>
  `,
})
export class ShuffleHero {
  protected readonly i18n = injectAppI18n();
  protected readonly t = this.i18n.t;
  // Server render and hydration use the stable order; shuffling starts in the browser.
  protected readonly squares = signal<Square[]>([...SQUARES]);

  constructor() {
    let timer: ReturnType<typeof setInterval> | undefined;
    afterNextRender(() => {
      this.squares.set(shuffled(SQUARES));
      timer = setInterval(() => this.squares.set(shuffled(SQUARES)), 3000);
    });
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  protected whatsapp(): string {
    return whatsappUrl(this.t('shuffleHero.actionMessage'));
  }
}
