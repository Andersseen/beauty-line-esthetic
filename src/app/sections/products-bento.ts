import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MoveHoverDirective, MoveVariantsDirective, type MoveVariant } from 'angular-movement';

import { sourceCatalog } from '../i18n/i18n';
import { injectAppI18n, listKey } from '../i18n/inject';
import { indicesOf } from '../shared/business';

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
  imports: [MoveHoverDirective, MoveVariantsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="group container mx-auto grid h-full w-full grid-cols-2 gap-4 rounded-lg p-2 md:grid-cols-4 md:grid-rows-4"
      (pointerenter)="hovered.set(true)"
      (pointerleave)="hovered.set(false)"
    >
      @for (i of products; track i) {
        <div [class]="'col-span-2 md:col-span-1 ' + spans[i]" [moveVariants]="tile" [moveVariant]="hovered() ? 'dimmed' : 'rest'">
          <div
            class="group/bento flex size-full min-h-32 items-center justify-center rounded-lg bg-gradient-to-br from-main-100 to-main-300 shadow-md transition duration-200 hover:shadow-xl"
            [moveWhileHover]="{ scale: [1, 1.02] }"
            [moveDuration]="200"
          >
            <div class="p-4">
              <div class="mt-2 text-center font-bold transition duration-200 group-hover/bento:-translate-x-2">
                {{ t(key('products', i, 'title')) }}
              </div>
              <div class="mt-1 text-center text-sm transition duration-200 group-hover/bento:translate-x-2">
                {{ t(key('products', i, 'description')) }}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
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
