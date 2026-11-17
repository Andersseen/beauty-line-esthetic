import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { LmnCalendarIcon } from 'lumen-icons/calendar';
import { LmnHeartIcon } from 'lumen-icons/heart';
import { LmnMessageCircleIcon } from 'lumen-icons/message-circle';
import { LmnSparklesIcon } from 'lumen-icons/sparkles';
import { LmnSunIcon } from 'lumen-icons/sun';
import { RouterLink } from '@angular/router';
import { VoltBadge, VoltNativeButton } from '@voltui/components';

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

const COLS = 4;
/** Must match the grid's `gap-1`. */
const GAP = '0.25rem';

function shuffled<T>(items: readonly T[]): T[] {
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
  imports: [RouterLink, VoltBadge, VoltNativeButton, LmnCalendarIcon, LmnSparklesIcon, LmnSunIcon, LmnHeartIcon, LmnMessageCircleIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-8 px-8 pt-28 pb-12 md:grid-cols-2">
      <div>
        <volt-badge variant="secondary" class="mb-4 text-main-700">{{ t('shuffleHero.tagline') }}</volt-badge>
        <h1 class="text-3xl font-semibold tracking-tight text-balance text-heading md:text-4xl lg:text-5xl">{{ t('shuffleHero.title') }}</h1>

        <div class="flex justify-center gap-8 pt-6 lg:justify-start">
          <div class="flex flex-col items-center">
            <lmn-calendar class="text-main-600 dark:text-main-400" [size]="32" />
            <span class="mt-2 text-sm text-muted-foreground">{{ t('shuffleHero.features.0') }}</span>
          </div>
          <div class="flex flex-col items-center">
            <lmn-sparkles class="text-main-600 dark:text-main-400" [size]="32" />
            <span class="mt-2 text-sm text-muted-foreground">{{ t('shuffleHero.features.1') }}</span>
          </div>
          <div class="flex flex-col items-center">
            <lmn-sun class="text-main-600 dark:text-main-400" [size]="32" />
            <span class="mt-2 text-sm text-muted-foreground">{{ t('shuffleHero.features.2') }}</span>
          </div>
        </div>

        <div class="flex flex-col items-start gap-4">
          <p class="mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <lmn-heart class="text-main-500" [size]="20" variant="filled" />
            {{ t('shuffleHero.satisfaction') }}
          </p>
          <div class="flex flex-wrap gap-3">
            <a voltButton size="lg" class="gap-2" [href]="whatsapp()" target="_blank" rel="noopener">
              <lmn-message-circle [size]="20" /> {{ t('shuffleHero.callAction') }}
            </a>
            <a voltButton size="lg" variant="outline" [routerLink]="i18n.path('/prices')">{{ t('shuffleHero.secondaryAction') }}</a>
          </div>
        </div>
      </div>

      <div class="grid h-[450px] grid-cols-4 grid-rows-4 gap-1" aria-hidden="true">
        @for (square of squares; track square.id; let home = $index) {
          <div
            class="tile size-full rounded-lg bg-cover bg-center"
            [style.background-image]="'url(' + square.src + ')'"
            [style.translate]="offset(home)"
          ></div>
        }
      </div>
    </section>
  `,
  styles: `
    .tile {
      transition: translate 0.9s cubic-bezier(0.34, 1.3, 0.64, 1);
      will-change: translate;
    }
  `,
})
export class ShuffleHero {
  protected readonly i18n = injectAppI18n();
  protected readonly t = this.i18n.t;
  protected readonly squares = SQUARES;
  /**
   * `slots()[i]` is the cell tile `i` currently shows in. Tiles never change DOM order: each one
   * slides to its cell with `translate` only, so the shuffle is not a layout shift (CLS), as a
   * DOM reorder animated back with FLIP would be.
   */
  protected readonly slots = signal<number[]>(SQUARES.map((_, i) => i));

  constructor() {
    let timer: ReturnType<typeof setInterval> | undefined;
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = setInterval(() => this.slots.set(shuffled(this.slots())), 3000);
    });
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  /** Offset from a tile's home cell to its current one, in whole cells (each cell + the gap). */
  protected offset(home: number): string {
    const slot = this.slots()[home] ?? home;
    const dx = (slot % COLS) - (home % COLS);
    const dy = Math.floor(slot / COLS) - Math.floor(home / COLS);
    return dx === 0 && dy === 0 ? '0 0' : `calc(${dx} * (100% + ${GAP})) calc(${dy} * (100% + ${GAP}))`;
  }

  protected whatsapp(): string {
    return whatsappUrl(this.t('shuffleHero.actionMessage'));
  }
}
