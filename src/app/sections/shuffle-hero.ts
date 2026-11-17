import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { LmnCalendarIcon } from 'lumen-icons/calendar';
import { LmnHeartIcon } from 'lumen-icons/heart';
import { LmnMessageCircleIcon } from 'lumen-icons/message-circle';
import { LmnSparklesIcon } from 'lumen-icons/sparkles';
import { LmnSunIcon } from 'lumen-icons/sun';
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
  imports: [LmnCalendarIcon, LmnSparklesIcon, LmnSunIcon, LmnHeartIcon, LmnMessageCircleIcon, MoveLayoutDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 pt-28 pb-12 md:grid-cols-2">
      <div>
        <span class="mb-4 block text-xs font-medium text-main-500 md:text-sm">{{ t('shuffleHero.tagline') }}</span>
        <h1 class="text-xl font-semibold md:text-4xl">{{ t('shuffleHero.title') }}</h1>

        <div class="flex justify-center space-x-8 pt-4 lg:justify-start">
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
          <div class="mt-4 flex w-fit items-center space-x-2 rounded-lg bg-main-100 p-4 shadow-lg">
            <lmn-heart class="text-main-500" [size]="24" />
            <span class="font-medium text-neutral-900">{{ t('shuffleHero.satisfaction') }}</span>
          </div>
          <a
            [href]="whatsapp()"
            target="_blank"
            rel="noopener"
            class="flex h-10 items-center gap-2 rounded-lg bg-main-500 px-6 py-2 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-main-600"
          >
            <lmn-message-circle [size]="24" /> {{ t('shuffleHero.callAction') }}
          </a>
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
  protected readonly t = injectAppI18n().t;
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
