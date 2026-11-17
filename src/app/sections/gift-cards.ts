import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

import { VoltNativeButton } from '@voltui/components';
import { LmnGiftIcon } from 'lumen-icons/gift';

import { injectAppI18n } from '../i18n/inject';
import { whatsappUrl } from '../shared/business';

/** Gift cards, with the Lottie animation loaded only in the browser. */
@Component({
  selector: 'app-gift-cards',
  imports: [VoltNativeButton, LmnGiftIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Unencapsulated: the rules below style the SVG Lottie injects at runtime (scoped by .gift-art).
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="container mx-auto flex h-fit flex-col px-4 py-12 md:flex-row">
      <div class="flex flex-1 items-center justify-center">
        <div #animation class="gift-art aspect-square w-full max-w-md" aria-hidden="true"></div>
      </div>
      <div class="flex flex-col items-start justify-center gap-4 p-4 lg:w-1/2">
        <h2 class="text-3xl font-bold tracking-tight text-heading sm:text-4xl md:text-5xl">{{ t('giftCards.title') }}</h2>
        <p class="text-muted-foreground md:text-lg">{{ t('giftCards.description') }}</p>
        <a voltButton size="lg" class="mt-2 gap-2" [href]="whatsapp()" target="_blank" rel="noopener">
          <lmn-gift [size]="20" /> {{ t('giftCards.callAction') }}
        </a>
      </div>
    </div>
  `,
  styles: `
    /* The animation ships in salmon/orange; recolour its three exact colours to the brand palette
       (CSS beats SVG presentation attributes), so the file itself stays untouched. */
    .gift-art [stroke='rgb(255,138,125)'] {
      stroke: var(--color-main-500);
    }
    .gift-art [fill='rgb(255,214,214)'] {
      fill: var(--color-main-200);
    }
    .gift-art [fill='rgb(254,242,242)'] {
      fill: var(--color-main-50);
    }
    .gift-art [stroke='rgb(254,242,242)'] {
      stroke: var(--color-main-50);
    }
    .dark .gift-art [stroke='rgb(255,138,125)'] {
      stroke: var(--color-main-400);
    }
  `,
})
export class GiftCards {
  protected readonly t = injectAppI18n().t;
  protected whatsapp(): string {
    return whatsappUrl(this.t('giftCards.actionMessage'));
  }

  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('animation');

  constructor() {
    let destroy: (() => void) | undefined;
    let destroyed = false;
    afterNextRender(async () => {
      const { default: lottie } = await import('lottie-web');
      if (destroyed) return;
      const instance = lottie.loadAnimation({
        container: this.container().nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animations/animation.json',
      });
      destroy = () => instance.destroy();
    });
    inject(DestroyRef).onDestroy(() => {
      destroyed = true;
      destroy?.();
    });
  }
}
