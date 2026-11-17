import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MoveHoverDirective } from 'angular-movement';

/**
 * Rounded photo shared by the service blocks. On hover the picture zooms slowly inside its frame
 * (the frame itself stays put) and a soft brand tint rises from the bottom.
 */
@Component({
  selector: 'app-service-image',
  imports: [MoveHoverDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'group/photo relative mx-auto block h-auto w-full overflow-hidden rounded-2xl shadow-lg shadow-main-900/10 transition-shadow duration-700 hover:shadow-xl hover:shadow-main-900/20 dark:shadow-black/40',
  },
  template: `
    <img
      [src]="src()"
      [alt]="alt()"
      [attr.width]="width()"
      [attr.height]="height()"
      loading="lazy"
      [class]="'relative z-0 w-full object-cover ' + imageClass()"
      [moveWhileHover]="{ scale: [1, 1.04] }"
      [moveSpring]="{ stiffness: 90, damping: 20 }"
    />
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-main-900/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover/photo:opacity-100"
    ></div>
  `,
})
export class ServiceImage {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly width = input(600);
  readonly height = input(400);
  readonly imageClass = input('');
}
