import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectResponse } from '@analogjs/router/tokens';
import { VoltNativeButton } from '@voltui/components';

import { injectAppI18n } from '../i18n/inject';
import { PageEnter } from '../ui/page-enter';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, VoltNativeButton, PageEnter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-enter>
      <section class="flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-28 text-center">
        <p class="text-7xl font-bold text-main-500">404</p>
        <h1 class="text-3xl font-semibold">{{ i18n.t('notFound.title') }}</h1>
        <p class="max-w-md text-gray-600">{{ i18n.t('notFound.description') }}</p>
        <a voltButton size="lg" class="bg-main-500 hover:bg-main-600" [routerLink]="i18n.path('/')">{{ i18n.t('notFound.back') }}</a>
      </section>
    </app-page-enter>
  `,
})
export default class NotFoundPage {
  protected readonly i18n = injectAppI18n();

  constructor() {
    // On the server, answer with a real 404 so the URL is not indexed as a page.
    const response = injectResponse();
    if (response) {
      response.statusCode = 404;
    }
  }
}
