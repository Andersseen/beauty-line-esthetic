import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveInViewDirective } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';
import { EASE_OUT, ENTER_MS } from '../shared/motion';
import { TextReveal } from '../ui/text-reveal';
import { MagicCard } from '../ui/magic-card';
import { ServiceImage } from './service-image';

@Component({
  selector: 'app-new-treatment',
  imports: [MoveInViewDirective, TextReveal, MagicCard, ServiceImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-8 flex w-full flex-col-reverse items-center lg:flex-row">
      <div class="h-fit w-full gap-4 lg:w-1/2 lg:p-8">
        <div
          class="relative"
          [moveInView]="{ opacity: [0, 1], y: [40, 0], scale: [0.97, 1], blur: [8, 0] }"
          [moveDuration]="enterMs"
          [moveEasing]="ease"
        >
          <app-service-image src="/26.webp" [alt]="t('newTreatment.title')" imageClass="aspect-square h-auto sm:aspect-[3/2]" />
        </div>
      </div>
      <div class="flex h-1/2 w-full lg:h-full lg:w-1/2 lg:p-16">
        <app-magic-card>
          <div class="w-full">
            <app-text-reveal class="mb-3">
              <h2 class="text-xl font-bold text-heading sm:text-2xl lg:text-3xl">{{ t('newTreatment.title') }}</h2>
            </app-text-reveal>
            <app-text-reveal [delay]="120">
              <p class="text-base text-wrap text-muted-foreground md:text-lg">{{ t('newTreatment.content') }}</p>
            </app-text-reveal>
            <ul class="mt-2 w-full space-y-1 text-muted-foreground" role="list">
              @for (i of info; track i; let index = $index) {
                <li>
                  <app-text-reveal [delay]="200 + index * 60"><span>{{ t(key('newTreatment.additionalInfo', i)) }}</span></app-text-reveal>
                </li>
              }
            </ul>
          </div>
        </app-magic-card>
      </div>
    </section>
  `,
})
export class NewTreatment {
  protected readonly t = injectAppI18n().t;
  protected readonly key = listKey;
  protected readonly info = indicesOf(sourceCatalog.newTreatment.additionalInfo);
  protected readonly ease = EASE_OUT;
  protected readonly enterMs = ENTER_MS;
}
