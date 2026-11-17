import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

/**
 * A card with a soft spotlight that follows the pointer. Rebuilt from the original Magic UI block
 * with plain signals: the gradient is a CSS custom property, no animation library involved.
 */
@Component({
  selector: 'app-magic-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'group relative flex overflow-hidden rounded-xl',
    '(pointermove)': 'track($event)',
    '(pointerleave)': 'reset()',
  },
  template: `
    <div class="relative z-10 w-full"><ng-content /></div>
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-80"
      [style.background]="gradient()"
    ></div>
  `,
})
export class MagicCard {
  readonly gradientSize = input(200);
  readonly gradientColor = input('var(--spotlight)');

  private readonly x = signal(-200);
  private readonly y = signal(-200);

  protected gradient(): string {
    return `radial-gradient(${this.gradientSize()}px circle at ${this.x()}px ${this.y()}px, ${this.gradientColor()}, transparent 100%)`;
  }

  protected track(event: PointerEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.x.set(event.clientX - rect.left);
    this.y.set(event.clientY - rect.top);
  }

  protected reset(): void {
    this.x.set(-this.gradientSize());
    this.y.set(-this.gradientSize());
  }
}
