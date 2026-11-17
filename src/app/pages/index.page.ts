import { ChangeDetectionStrategy, Component } from '@angular/core';

import { injectAppI18n } from '../i18n/inject';
import { WhatsAppButton } from '../layout/whatsapp-button';
import { ContactSection } from '../sections/contact-section';
import { Features } from '../sections/features';
import { GiftCards } from '../sections/gift-cards';
import { ProductsBento } from '../sections/products-bento';
import { Services } from '../sections/services';
import { ShuffleHero } from '../sections/shuffle-hero';
import { injectPageSeo } from '../seo/page-seo';
import { PageEnter } from '../ui/page-enter';

@Component({
  selector: 'app-home-page',
  imports: [PageEnter, ShuffleHero, Features, Services, ProductsBento, GiftCards, ContactSection, WhatsAppButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-enter>
      <section class="mx-auto min-h-screen w-full overflow-hidden rounded-md">
        <app-shuffle-hero />
        <app-features />
        <app-services />
        <app-products-bento />
        @defer (on viewport) {
          <app-gift-cards />
        } @placeholder {
          <div class="h-96"></div>
        }
        <app-contact-section />
      </section>
    </app-page-enter>
    <app-whatsapp-button [message]="t('shuffleHero.actionMessage')" />
  `,
})
export default class HomePage {
  protected readonly t = injectAppI18n().t;

  constructor() {
    injectPageSeo('home');
  }
}
