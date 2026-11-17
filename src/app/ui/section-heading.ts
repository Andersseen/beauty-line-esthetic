import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MoveInViewDirective } from 'angular-movement';

/** Centered section title with an optional lead paragraph, shared by the home sections. */
@Component({
  selector: 'app-section-heading',
  imports: [MoveInViewDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mx-auto mb-10 block max-w-2xl px-4 text-center' },
  template: `
    <div moveInView="fade-up">
      <h2 class="text-3xl font-bold tracking-tight text-balance text-main-950 md:text-4xl">{{ title() }}</h2>
      @if (description()) {
        <p class="mt-3 text-base text-balance text-gray-600 md:text-lg">{{ description() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly title = input.required<string>();
  readonly description = input<string>();
}
