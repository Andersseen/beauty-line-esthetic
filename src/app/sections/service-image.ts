import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MoveHoverDirective } from 'angular-movement';

/** Rounded photo that tilts and grows slightly on hover (spring), shared by the service blocks. */
@Component({
  selector: 'app-service-image',
  imports: [MoveHoverDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'relative mx-auto block h-auto w-full overflow-hidden rounded-lg' },
  template: `
    <img
      [src]="src()"
      [alt]="alt()"
      [attr.width]="width()"
      [attr.height]="height()"
      loading="lazy"
      [class]="'relative z-0 w-full rounded-lg object-cover shadow-lg ' + imageClass()"
      [moveWhileHover]="{ scale: [1, 1.05], rotate: [0, 1] }"
      [moveSpring]="{ stiffness: 300, damping: 20 }"
    />
  `,
})
export class ServiceImage {
  readonly src = input.required<string>();
  readonly alt = input('');
  readonly width = input(600);
  readonly height = input(400);
  readonly imageClass = input('');
}
