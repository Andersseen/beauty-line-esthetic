import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnCheckIcon } from 'lumen-icons/check';
import { MoveInViewDirective } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';
import { EASE_OUT, ENTER_MS } from '../shared/motion';
import { TextReveal } from '../ui/text-reveal';
import { MagicCard } from '../ui/magic-card';
import { ServiceImage } from './service-image';

const GALLERY = ['/19.webp', '/20.webp', '/21.webp', '/22.webp'];

/** Slimming treatments: text with phases on one side, a staggered 2×2 gallery on the other. */
@Component({
  selector: 'app-split-section',
  imports: [LmnCheckIcon, MoveInViewDirective, TextReveal, MagicCard, ServiceImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-8 flex w-full flex-col items-center lg:flex-row">
      <div class="flex h-1/2 w-full items-center justify-center lg:h-full lg:w-1/2 lg:p-16">
        <app-magic-card>
          <div class="w-full">
            <app-text-reveal class="mb-3">
              <h2 class="text-xl font-bold text-heading sm:text-2xl lg:text-3xl">{{ t('splitSection.title') }}</h2>
            </app-text-reveal>
            <app-text-reveal [delay]="120">
              <p class="text-base text-wrap text-muted-foreground md:text-lg">{{ t('splitSection.content') }}</p>
            </app-text-reveal>
            <ul class="mt-3 space-y-1 text-foreground/85" role="list">
              @for (i of phases; track i; let index = $index) {
                <li><app-text-reveal [delay]="200 + index * 60"><span>{{ t(key('splitSection.phases', i)) }}</span></app-text-reveal></li>
              }
            </ul>
            <ul class="mt-4 grid gap-2 text-muted-foreground sm:grid-cols-2" role="list">
              @for (i of info; track i; let index = $index) {
                <li class="flex items-center gap-2">
                  <lmn-check class="shrink-0 text-main-500" [size]="16" [strokeWidth]="2.5" />
                  <app-text-reveal [delay]="index * 60"><span>{{ t(key('splitSection.additionalInfo', i)) }}</span></app-text-reveal>
                </li>
              }
            </ul>
          </div>
        </app-magic-card>
      </div>
      <div class="grid h-1/2 w-full grid-cols-2 gap-4 lg:h-full lg:min-h-[500px] lg:w-1/2 lg:p-8">
        @for (src of gallery; track src; let index = $index) {
          <div
            class="relative h-fit"
            [moveInView]="{ opacity: [0, 1], y: [32, 0], scale: [0.96, 1], blur: [8, 0] }"
            [moveDuration]="enterMs"
            [moveEasing]="ease"
            [moveDelay]="index * 120"
          >
            <app-service-image [src]="src" [alt]="t('splitSection.title')" [width]="300" [height]="300" imageClass="aspect-square max-h-[300px]" />
          </div>
        }
      </div>
    </section>
  `,
})
export class SplitSection {
  protected readonly t = injectAppI18n().t;
  protected readonly key = listKey;
  protected readonly phases = indicesOf(sourceCatalog.splitSection.phases);
  protected readonly info = indicesOf(sourceCatalog.splitSection.additionalInfo);
  protected readonly gallery = GALLERY;
  protected readonly ease = EASE_OUT;
  protected readonly enterMs = ENTER_MS;
}
