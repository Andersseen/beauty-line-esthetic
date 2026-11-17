import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveInViewDirective } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';
import { BoxReveal } from '../ui/box-reveal';
import { MagicCard } from '../ui/magic-card';
import { ServiceImage } from './service-image';

@Component({
  selector: 'app-new-treatment',
  imports: [MoveInViewDirective, BoxReveal, MagicCard, ServiceImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-8 flex w-full flex-col-reverse items-center lg:flex-row" [moveInView]="{ opacity: [0, 1] }" [moveDuration]="500">
      <div class="h-fit w-full gap-4 lg:w-1/2 lg:p-8">
        <div class="relative overflow-hidden rounded-lg" [moveInView]="{ opacity: [0, 1], scale: [0.8, 1] }" [moveDuration]="500">
          <app-service-image src="/26.webp" [alt]="t('newTreatment.title')" imageClass="aspect-square h-auto sm:aspect-[3/2]" />
        </div>
      </div>
      <div class="flex h-1/2 w-full lg:h-full lg:w-1/2 lg:p-16">
        <app-magic-card>
          <div class="w-full" [moveInView]="{ opacity: [0, 1], y: [50, 0] }" [moveDuration]="500">
            <app-box-reveal class="mb-3">
              <h2 class="text-xl font-bold sm:text-2xl lg:text-3xl">{{ t('newTreatment.title') }}</h2>
            </app-box-reveal>
            <app-box-reveal>
              <p class="text-base text-wrap text-gray-700 md:text-lg">{{ t('newTreatment.content') }}</p>
            </app-box-reveal>
            <ul class="mt-2 w-full space-y-1 text-neutral-500">
              @for (i of info; track i) {
                <li>
                  <app-box-reveal><span>{{ t(key('newTreatment.additionalInfo', i)) }}</span></app-box-reveal>
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
}
