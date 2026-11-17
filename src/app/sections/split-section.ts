import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveInViewDirective } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';
import { BoxReveal } from '../ui/box-reveal';
import { MagicCard } from '../ui/magic-card';
import { ServiceImage } from './service-image';

const GALLERY = ['/19.webp', '/20.webp', '/21.webp', '/22.webp'];

/** Slimming treatments: text with phases on one side, a staggered 2×2 gallery on the other. */
@Component({
  selector: 'app-split-section',
  imports: [MoveInViewDirective, BoxReveal, MagicCard, ServiceImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-8 flex w-full flex-col items-center lg:flex-row" [moveInView]="{ opacity: [0, 1] }" [moveDuration]="500">
      <div class="flex h-1/2 w-full items-center justify-center lg:h-full lg:w-1/2 lg:p-16">
        <app-magic-card>
          <div class="w-full" [moveInView]="{ opacity: [0, 1], y: [50, 0] }" [moveDuration]="500">
            <app-box-reveal class="mb-3">
              <h2 class="text-xl font-bold sm:text-2xl lg:text-3xl">{{ t('splitSection.title') }}</h2>
            </app-box-reveal>
            <app-box-reveal>
              <p class="text-base text-wrap text-gray-700 md:text-lg">{{ t('splitSection.content') }}</p>
            </app-box-reveal>
            <ul class="mt-2 space-y-1">
              @for (i of phases; track i) {
                <li><app-box-reveal><span>{{ t(key('splitSection.phases', i)) }}</span></app-box-reveal></li>
              }
            </ul>
            <ul class="mt-2 list-inside list-disc space-y-1 text-neutral-500">
              @for (i of info; track i) {
                <li><app-box-reveal><span>{{ t(key('splitSection.additionalInfo', i)) }}</span></app-box-reveal></li>
              }
            </ul>
          </div>
        </app-magic-card>
      </div>
      <div class="grid h-1/2 w-full grid-cols-2 gap-4 lg:h-full lg:min-h-[500px] lg:w-1/2 lg:p-8">
        @for (src of gallery; track src; let index = $index) {
          <div
            class="relative h-fit overflow-hidden rounded-lg"
            [moveInView]="{ opacity: [0, 1], scale: [0.8, 1] }"
            [moveDuration]="500"
            [moveDelay]="index * 300"
          >
            <app-service-image [src]="src" [width]="300" [height]="300" imageClass="aspect-square max-h-[300px]" />
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
}
