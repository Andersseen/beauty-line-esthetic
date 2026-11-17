import { DOCUMENT, effect, inject } from '@angular/core';

import { injectAppI18n } from '../i18n/inject';
import { BUSINESS } from '../shared/business';
import { OG_IMAGE } from './page-seo';
import { injectOrigin } from './origin';

const SCRIPT_ID = 'ld-business';

/**
 * schema.org `BeautySalon` (a LocalBusiness) as JSON-LD in `<head>`: name, address, geo,
 * opening hours and phone, so search engines can show the salon as a local business.
 * Rendered on the server; updated in place on hydration and locale changes.
 */
export function injectBusinessSchema(): void {
  const i18n = injectAppI18n();
  const document = inject(DOCUMENT);
  const origin = injectOrigin();

  effect(() => {
    const t = i18n.t;
    const url = origin + i18n.path('/');
    const data = {
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      '@id': `${origin}/#business`,
      name: t('seo.siteName'),
      description: t('seo.home.description'),
      url,
      image: origin + OG_IMAGE.path,
      logo: `${origin}/logo.png`,
      telephone: BUSINESS.phone,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Cash, Credit Card',
      inLanguage: i18n.locale(),
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.locality,
        addressRegion: BUSINESS.address.region,
        addressCountry: BUSINESS.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.salonGeo[0],
        longitude: BUSINESS.salonGeo[1],
      },
      hasMap: BUSINESS.mapUrl,
      areaServed: 'Alcorcón, Madrid',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '10:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '10:00',
          closes: '14:00',
        },
      ],
    };

    let script = document.getElementById(SCRIPT_ID);
    if (!script) {
      script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    // JSON.stringify output contains no "</script"; escape "<" anyway so copy can never break out.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  });
}
