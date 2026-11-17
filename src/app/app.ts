import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './layout/footer';
import { Header } from './layout/header';
import { ScrollTopButton } from './layout/scroll-top-button';
import { injectBusinessSchema } from './seo/business-schema';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ScrollTopButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <!-- At least one screen tall, so the curtain footer is always uncovered by scrolling. -->
    <main class="block min-h-svh">
      <router-outlet />
    </main>
    <app-footer />
    <app-scroll-top-button />
  `,
})
export class App {
  constructor() {
    // Page-level tags come from each page (injectPageSeo); the business is described once.
    injectBusinessSchema();
  }
}
