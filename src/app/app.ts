import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { injectAppI18n } from './i18n/inject';
import { Footer } from './layout/footer';
import { Header } from './layout/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {
  private readonly i18n = injectAppI18n();

  constructor() {
    const title = inject(Title);
    const meta = inject(Meta);
    // Title and description follow the active locale (Etyma owns lang, canonical and hreflang).
    effect(() => {
      title.setTitle(this.i18n.t('seo.title'));
      meta.updateTag({ name: 'description', content: this.i18n.t('seo.description') });
    });
  }
}
