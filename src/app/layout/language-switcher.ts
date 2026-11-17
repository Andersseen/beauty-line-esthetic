import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { Locale } from '@etyma/core';
import { VoltNativeButton } from '@voltui/components';

import { injectAppI18n } from '../i18n/inject';

/** Labels shown in the switcher. Ukrainian keeps the `UA` label the site always used. */
const LABELS: Readonly<Record<string, string>> = { es: 'ES', en: 'EN', uk: 'UA' };

/**
 * Segmented ES / EN / UA switch. Switching is a navigation (Etyma keeps the current page and
 * moves to its localized URL), so the address bar always names the language on screen.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [VoltNativeButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex rounded-md shadow-sm" role="group" [attr.aria-label]="i18n.t('nav.language')">
      @for (locale of i18n.locales; track locale; let first = $first; let last = $last) {
        <button
          voltButton
          type="button"
          size="sm"
          [variant]="locale === i18n.locale() ? 'solid' : 'outline'"
          [class]="classes(locale, first, last)"
          [attr.lang]="locale"
          [attr.aria-pressed]="locale === i18n.locale()"
          (click)="switchTo(locale)"
        >
          {{ label(locale) }}
        </button>
      }
    </div>
  `,
})
export class LanguageSwitcher {
  protected readonly i18n = injectAppI18n();

  protected label(locale: Locale): string {
    return LABELS[locale] ?? locale.toUpperCase();
  }

  protected classes(locale: Locale, first: boolean, last: boolean): string {
    const shape = first ? 'rounded-none rounded-l-md' : last ? 'rounded-none rounded-r-md' : 'rounded-none';
    const tone =
      locale === this.i18n.locale()
        ? 'border border-main-950 bg-main-950 text-main-50 hover:bg-main-900'
        : 'bg-white text-main-950 hover:bg-main-400 hover:text-white';
    return `${shape} ${tone}`;
  }

  protected switchTo(locale: Locale): void {
    void this.i18n.setLocale(locale).catch((error: unknown) => console.error(error));
  }
}
