import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import type { Type } from '@angular/core';
import { LmnBeakerIcon } from 'lumen-icons/beaker';
import { LmnCheckBadgeIcon } from 'lumen-icons/check-badge';
import { LmnFaceSmileIcon } from 'lumen-icons/face-smile';
import { LmnUserCircleIcon } from 'lumen-icons/user-circle';
import { VoltCard, VoltCardContent } from '@voltui/components';
import { MoveInViewDirective } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';

/** One icon per feature, in catalog order: products, service, team, ambience. */
const ICONS: readonly Type<unknown>[] = [LmnBeakerIcon, LmnUserCircleIcon, LmnCheckBadgeIcon, LmnFaceSmileIcon];

@Component({
  selector: 'app-features',
  imports: [NgComponentOutlet, VoltCard, VoltCardContent, MoveInViewDirective],
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
          <h2 class="text-3xl font-bold tracking-tight text-balance text-heading md:text-4xl">{{ t('featuresSection.title') }}</h2>
          <p>{{ t('featuresSection.description') }}</p>
          <div class="space-y-3">
            @for (i of features; track i) {
              <volt-card
                class="transition-shadow hover:shadow-lg hover:shadow-main-800/10"
                moveInView="fade-up"
                [moveDelay]="i * 80"
              >
                <volt-card-content class="flex gap-4 p-4">
                  <span class="flex shrink-0 self-start rounded-lg bg-main-600/10 p-3 text-main-600 dark:text-main-400">
                    <ng-container *ngComponentOutlet="icons[i]!; inputs: { size: 24 }" />
                  </span>
                  <div class="space-y-0.5">
                    <h3 class="text-lg font-semibold text-foreground">{{ t(key('featuresSection.features', i, 'title')) }}</h3>
                    <p class="text-muted-foreground">{{ t(key('featuresSection.features', i, 'description')) }}</p>
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
  protected readonly icons = ICONS;
  protected readonly features = indicesOf(sourceCatalog.featuresSection.features);
}
