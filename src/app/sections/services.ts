import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveInViewDirective } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';
import { EASE_OUT, ENTER_MS } from '../shared/motion';
import { TextReveal } from '../ui/text-reveal';
import { MagicCard } from '../ui/magic-card';
import { SectionHeading } from '../ui/section-heading';
import { NewTreatment } from './new-treatment';
import { ServiceImage } from './service-image';
import { SplitSection } from './split-section';

/** Photo for each service, in catalog order. */
const IMAGES = ['/06.webp', '/07.webp', '/24.webp', '/08.webp', '/23.webp', '/13.webp', '/25.webp', '/04.webp', '/17.webp', '/11.webp'];

/** Alternating service blocks; the two feature treatments sit after the seventh one. */
@Component({
  selector: 'app-services',
  imports: [MoveInViewDirective, SectionHeading, TextReveal, MagicCard, ServiceImage, NewTreatment, SplitSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="services" class="container mx-auto px-4 py-12 lg:px-8">
      <app-section-heading [title]="t('servicesSection.title')" [description]="t('servicesSection.description')" />
      @for (i of sections; track i) {
        <div class="py-4">
          <article
            class="flex flex-col items-center gap-8 py-12 lg:max-h-[400px]"
            [class.md:flex-row]="i % 2 === 0"
            [class.md:flex-row-reverse]="i % 2 === 1"
          >
            <app-magic-card class="w-full space-y-4 px-1 md:w-1/2 lg:p-8">
              <app-text-reveal class="mb-3">
                <h2 class="text-xl font-bold text-heading sm:text-2xl lg:text-3xl">{{ t(key('servicesSection.sections', i, 'title')) }}</h2>
              </app-text-reveal>
              <app-text-reveal [delay]="120">
                <p class="text-base text-wrap text-muted-foreground md:text-lg">{{ t(key('servicesSection.sections', i, 'content')) }}</p>
              </app-text-reveal>
            </app-magic-card>
            <div
              class="w-full md:w-1/2"
              [moveInView]="{ opacity: [0, 1], y: [40, 0], scale: [0.97, 1], blur: [8, 0] }"
              [moveDuration]="enterMs"
              [moveEasing]="ease"
            >
              <app-service-image
                [src]="images[i]!"
                [alt]="t(key('servicesSection.sections', i, 'title'))"
                imageClass="aspect-square h-fit sm:aspect-[3/2] lg:max-h-[400px]"
              />
            </div>
          </article>

          @if (i === 6) {
            <app-new-treatment />
            <app-split-section />
          }
        </div>
      }
    </section>
  `,
})
export class Services {
  protected readonly t = injectAppI18n().t;
  protected readonly key = listKey;
  protected readonly sections = indicesOf(sourceCatalog.servicesSection.sections);
  protected readonly images = IMAGES;
  protected readonly ease = EASE_OUT;
  protected readonly enterMs = ENTER_MS;
}
