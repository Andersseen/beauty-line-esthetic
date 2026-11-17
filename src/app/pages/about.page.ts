import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoveInViewDirective } from 'angular-movement';

import { injectAppI18n } from '../i18n/inject';
import { injectPageSeo } from '../seo/page-seo';
import { PageEnter } from '../ui/page-enter';

@Component({
  selector: 'app-about-page',
  imports: [PageEnter, MoveInViewDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-enter>
      <div class="flex min-h-screen w-full items-center justify-center bg-rose-50 p-4 pt-28 md:p-8 md:pt-28">
        <div class="mx-auto max-w-6xl">
          <div class="flex flex-col items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-12">
            <div class="w-full md:w-1/2" moveInView="fade-right">
              <img src="/14.webp" [alt]="t('about.imageAlt')" width="600" height="600" class="h-auto w-full rounded-lg object-cover" />
            </div>
            <div class="flex w-full flex-col justify-center md:w-1/2" moveInView="fade-left">
              <h1 class="mb-4 text-3xl font-bold text-main-600 md:text-4xl">{{ t('about.title') }}</h1>
              <p class="mb-8 leading-relaxed text-gray-600">{{ t('about.description') }}</p>
            </div>
          </div>
        </div>
      </div>
    </app-page-enter>
  `,
})
export default class AboutPage {
  protected readonly t = injectAppI18n().t;

  constructor() {
    injectPageSeo('about');
  }
}
