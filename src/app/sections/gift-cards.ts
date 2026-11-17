import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

import { injectAppI18n } from '../i18n/inject';

/** Gift cards, with the Lottie animation loaded only in the browser. */
@Component({
  selector: 'app-gift-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto flex h-fit flex-col md:flex-row">
      <div class="flex flex-1 items-center justify-center">
        <div #animation class="aspect-square w-full max-w-md" aria-hidden="true"></div>
      </div>
      <div class="flex flex-col items-start justify-center gap-4 p-4 lg:w-1/2">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{{ t('giftCards.title') }}</h2>
        <p class="p-4 text-gray-500">{{ t('giftCards.description') }}</p>
      </div>
    </div>
  `,
})
export class GiftCards {
  protected readonly t = injectAppI18n().t;
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
