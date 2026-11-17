import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  VoltCard,
  VoltCardContent,
  VoltCardHeader,
  VoltCardTitle,
  VoltNativeButton,
  VoltTabs,
  VoltTabsContent,
  VoltTabsList,
  VoltTabsTrigger,
} from '@voltui/components';
import { LmnPhoneIcon } from 'lumen-icons/phone';
import { MoveInViewDirective } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { BUSINESS } from '../shared/business';
import { injectPageSeo } from '../seo/page-seo';
import { PageEnter } from '../ui/page-enter';

type Category = keyof typeof sourceCatalog.prices.treatments;

interface TreatmentEntry {
  readonly index: number;
  readonly hasDescription: boolean;
  readonly hasDuration: boolean;
}

/** The treatments of a category and which optional fields they carry, from the source catalog. */
function entries(category: Category): TreatmentEntry[] {
  return Object.entries(sourceCatalog.prices.treatments[category]).map(([index, item]) => ({
    index: Number(index),
    hasDescription: 'description' in item,
    hasDuration: 'duration' in item,
  }));
}

@Component({
  selector: 'app-prices-page',
  imports: [
    NgTemplateOutlet,
    PageEnter,
    MoveInViewDirective,
    VoltTabs,
    VoltTabsList,
    VoltTabsTrigger,
    VoltTabsContent,
    VoltCard,
    VoltCardHeader,
    VoltCardTitle,
    VoltCardContent,
    VoltNativeButton,
    LmnPhoneIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-enter>
      <section class="min-h-screen w-full p-2 pt-28 shadow-lg md:p-8 md:pt-28">
        <div class="container mx-auto py-10">
          <h1 class="mb-10 text-center text-4xl font-bold">{{ t('prices.pageTitle') }}</h1>

          <volt-tabs value="estetica" class="w-full">
            <volt-tabs-list class="grid w-full grid-cols-3">
              <volt-tabs-trigger value="estetica">{{ t('prices.tabs.estetica') }}</volt-tabs-trigger>
              <volt-tabs-trigger value="depilacion">{{ t('prices.tabs.depilacion') }}</volt-tabs-trigger>
              <volt-tabs-trigger value="corporal">{{ t('prices.tabs.corporal') }}</volt-tabs-trigger>
            </volt-tabs-list>

            <volt-tabs-content value="estetica">
              <ng-container *ngTemplateOutlet="grid; context: { $implicit: 'prices.treatments.estetica', items: estetica }" />
            </volt-tabs-content>

            <volt-tabs-content value="depilacion">
              <volt-card>
                <volt-card-header>
                  <volt-card-title>{{ t('prices.tabs.depilacion') }}</volt-card-title>
                </volt-card-header>
                <volt-card-content>
                  <ul class="list-disc space-y-2 pl-5">
                    @for (item of depilacion; track item.index) {
                      <li>{{ t(key('prices.treatments.depilacion', item.index, 'title')) }}</li>
                    }
                  </ul>
                </volt-card-content>
              </volt-card>
            </volt-tabs-content>

            <volt-tabs-content value="corporal">
              <ng-container *ngTemplateOutlet="grid; context: { $implicit: 'prices.treatments.corporal', items: corporal }" />
            </volt-tabs-content>
          </volt-tabs>

          <ng-template #grid let-list let-items="items">
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              @for (item of asEntries(items); track item.index) {
                <volt-card moveInView="fade-up" [moveDelay]="(item.index % 3) * 80">
                  <volt-card-header>
                    <volt-card-title>{{ t(key(list, item.index, 'title')) }}</volt-card-title>
                  </volt-card-header>
                  <volt-card-content>
                    @if (item.hasDescription) {
                      <p class="mb-4 text-sm text-gray-600">{{ t(key(list, item.index, 'description')) }}</p>
                    }
                    @if (item.hasDuration) {
                      <p class="mt-2 text-sm text-gray-600">
                        {{ t('prices.durationLabel') }}: {{ t(key(list, item.index, 'duration')) }}
                      </p>
                    }
                  </volt-card-content>
                </volt-card>
              }
            </div>
          </ng-template>

          <div class="mt-12 text-center">
            <h2 class="mb-4 text-2xl font-semibold">{{ t('prices.contact.interestedText') }}</h2>
            <p class="mb-6">{{ t('prices.contact.callToAction') }}</p>
            <a voltButton size="lg" class="gap-2 bg-main-500 hover:bg-main-900" [href]="'tel:' + phone">
              <lmn-phone [size]="20" />
              {{ t('prices.contact.callToAction') }}
            </a>
          </div>
        </div>
      </section>
    </app-page-enter>
  `,
})
export default class PricesPage {
  protected readonly t = injectAppI18n().t;
  protected readonly key = listKey;
  protected readonly phone = BUSINESS.phone;
  protected readonly estetica = entries('estetica');
  protected readonly depilacion = entries('depilacion');
  protected readonly corporal = entries('corporal');

  protected asEntries(items: unknown): TreatmentEntry[] {
    return items as TreatmentEntry[];
  }

  constructor() {
    injectPageSeo('prices');
  }
}
