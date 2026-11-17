import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';

import { BUSINESS } from '../shared/business';

/** Rotating Cobe globe with a marker on the salon (browser only). */
@Component({
  selector: 'app-globe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `<canvas #canvas class="aspect-square w-[600px] max-w-full" aria-hidden="true"></canvas>`,
})
export class Globe {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    let destroy: (() => void) | undefined;
    let destroyed = false;
    afterNextRender(async () => {
      const { default: createGlobe } = await import('cobe');
      if (destroyed) return;
      let phi = 0;
      const globe = createGlobe(this.canvas().nativeElement, {
        devicePixelRatio: 2,
        width: 1200,
        height: 1200,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.9, 0.5, 0.6],
        glowColor: [1, 1, 1],
        markers: [{ location: [...BUSINESS.location], size: 0.1 }],
        onRender: (state) => {
          state['phi'] = phi;
          phi += 0.005;
        },
      });
      destroy = () => globe.destroy();
    });
    inject(DestroyRef).onDestroy(() => {
      destroyed = true;
      destroy?.();
    });
  }
}
