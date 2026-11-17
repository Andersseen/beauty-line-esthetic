import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { VoltCard } from '@voltui/components';
import { MoveHoverDirective, MoveVariantsDirective, type MoveVariant } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';
import { SectionHeading } from '../ui/section-heading';

/** Bento placement per product, in catalog order (mobile: every tile spans the full width). */
const SPANS = [
  'md:col-span-2 md:row-span-1',
  'md:col-span-2 md:row-span-1',
  'md:col-span-1 md:row-span-4',
  'md:col-span-2 md:row-span-2',
  'md:col-span-1 md:row-span-2',
  'md:col-span-3 md:row-span-2',
];

/** While the grid is hovered every tile settles back a little, so the hovered one stands out. */
const TILE: Record<string, MoveVariant> = {
  rest: { scale: 1, duration: 200 },
  dimmed: { scale: 0.99, duration: 200 },
};

@Component({
  selector: 'app-products-bento',
  imports: [VoltCard, SectionHeading, MoveHoverDirective, MoveVariantsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-16">
    <app-section-heading [title]="t('productsSection.title')" [description]="t('productsSection.description')" />
    <div
      class="group container mx-auto grid h-full w-full grid-cols-2 gap-4 rounded-lg px-4 py-2 lg:px-8 md:grid-cols-4 md:grid-rows-4"
      (pointerenter)="hovered.set(true)"
      (pointerleave)="hovered.set(false)"
    >
      @for (i of products; track i) {
        <div [class]="'col-span-2 md:col-span-1 ' + spans[i]" [moveVariants]="tile" [moveVariant]="hovered() ? 'dimmed' : 'rest'">
          <volt-card
            class="group/bento flex size-full min-h-32 items-center justify-center border-main-200 bg-gradient-to-br from-main-50 to-main-200 transition-shadow duration-200 hover:shadow-xl"
            [moveWhileHover]="{ scale: [1, 1.02] }"
            [moveDuration]="200"
          >
            <div class="p-5">
              <div class="text-center text-lg font-semibold text-main-950 transition duration-200 group-hover/bento:-translate-x-2">
                {{ t(key('products', i, 'title')) }}
              </div>
              <div class="mt-1 text-center text-sm text-gray-700 transition duration-200 group-hover/bento:translate-x-2">
                {{ t(key('products', i, 'description')) }}
              </div>
            </div>
          </volt-card>
        </div>
      }
    </div>
    </section>
  `,
})
export class ProductsBento {
  protected readonly t = injectAppI18n().t;
  protected readonly key = listKey;
  protected readonly products = indicesOf(sourceCatalog.products);
  protected readonly spans = SPANS;
  protected readonly tile = TILE;
  protected readonly hovered = signal(false);
}
