import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MoveVariantsDirective, type MoveVariant } from 'angular-movement';

const SPRING = { stiffness: 260, damping: 20 };

const TOP: Record<string, MoveVariant> = {
  closed: { rotate: 0, y: 0, spring: SPRING },
  opened: { rotate: 45, y: 7, spring: SPRING },
};
const CENTER: Record<string, MoveVariant> = {
  closed: { opacity: 1, duration: 200 },
  opened: { opacity: 0, duration: 200 },
};
const BOTTOM: Record<string, MoveVariant> = {
  closed: { rotate: 0, y: 0, spring: SPRING },
  opened: { rotate: -45, y: -7, spring: SPRING },
};

/** The round burger that morphs into a cross, driven by Angular Movement spring variants. */
@Component({
  selector: 'app-menu-button',
  imports: [MoveVariantsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'relative flex size-[50px] items-center justify-center rounded-full shadow-md ring-0 ring-pink-100/30 transition-all duration-200 hover:ring-8',
  },
  template: `
    <span class="flex w-6 flex-col gap-[5px]" aria-hidden="true">
      <span class="line" [moveVariants]="top" [moveVariant]="state()"></span>
      <span class="line" [moveVariants]="center" [moveVariant]="state()"></span>
      <span class="line" [moveVariants]="bottom" [moveVariant]="state()"></span>
    </span>
  `,
  styles: `
    .line {
      display: block;
      height: 2px;
      width: 100%;
      border-radius: 9999px;
      background: #fdf2f8;
    }
  `,
})
export class MenuButton {
  readonly open = input(false);

  protected readonly top = TOP;
  protected readonly center = CENTER;
  protected readonly bottom = BOTTOM;

  protected state(): 'opened' | 'closed' {
    return this.open() ? 'opened' : 'closed';
  }
}
