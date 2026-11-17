import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LmnHeartIcon } from 'lumen-icons/heart';
import { VoltCard, VoltCardContent } from '@voltui/components';
import { MoveInViewDirective } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';

@Component({
  selector: 'app-features',
  imports: [VoltCard, VoltCardContent, LmnHeartIcon, MoveInViewDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-20">
      <div class="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-10 md:px-12 lg:flex-row lg:px-5 xl:gap-14">
        <div class="relative flex w-full justify-center lg:w-1/2 lg:items-end xl:w-[45%]">
          <img
            src="/09.webp"
            width="1001"
            height="1001"
            [alt]="t('featuresSection.title')"
            loading="lazy"
            class="relative h-auto w-full rounded-3xl lg:w-[86%]"
          />
        </div>
        <div class="flex flex-1 flex-col gap-5">
          <h2 class="text-3xl font-bold tracking-tight text-balance text-main-950 md:text-4xl">{{ t('featuresSection.title') }}</h2>
          <p>{{ t('featuresSection.description') }}</p>
          <div class="space-y-3">
            @for (i of features; track i) {
              <volt-card
                class="transition-shadow hover:shadow-lg hover:shadow-main-800/10"
                moveInView="fade-up"
                [moveDelay]="i * 80"
              >
                <volt-card-content class="flex gap-4 p-4">
                  <lmn-heart class="shrink-0 text-main-600" [size]="24" background="soft" backgroundColor="color-mix(in srgb, var(--color-main-600) 10%, transparent)" [padding]="12" radius="0.5rem" />
                  <div class="space-y-0.5">
                    <h3 class="text-lg font-semibold text-gray-900">{{ t(key('featuresSection.features', i, 'title')) }}</h3>
                    <p class="text-gray-600">{{ t(key('featuresSection.features', i, 'description')) }}</p>
                  </div>
                </volt-card-content>
              </volt-card>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Features {
  protected readonly t = injectAppI18n().t;
  protected readonly key = listKey;
  protected readonly features = indicesOf(sourceCatalog.featuresSection.features);
}
