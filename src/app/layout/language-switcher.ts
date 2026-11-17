import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import type { Locale } from '@etyma/core';
import { VoltToggleGroup, VoltToggleGroupItem } from '@voltui/components';

import { injectAppI18n } from '../i18n/inject';

/** Short labels shown in the switch. Ukrainian keeps the `UA` label the site always used. */
const LABELS: Readonly<Record<string, string>> = { es: 'ES', en: 'EN', uk: 'UA' };
/** Accessible names, written in the language they name. */
const NAMES: Readonly<Record<string, string>> = { es: 'Español', en: 'English', uk: 'Українська' };

/**
 * ES / EN / UA segmented switch built on Volt's ToggleGroup (single selection, no deselection).
 * Selecting is a navigation: Etyma moves to the current page's localized URL, so the selected item
 * always follows the address bar rather than local state.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [VoltToggleGroup, VoltToggleGroupItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <volt-toggle-group
      type="single"
      [allowDeselection]="false"
      [value]="selected()"
      (valueChange)="switchTo($event)"
      class="switcher gap-0 rounded-full border-0 bg-white/90 p-0.5 shadow-sm"
      [attr.aria-label]="i18n.t('nav.language')"
    >
      @for (locale of i18n.locales; track locale) {
        <volt-toggle-group-item
          [value]="locale"
          size="sm"
          [aria-label]="name(locale)"
          [attr.lang]="locale"
        >
          {{ label(locale) }}
        </volt-toggle-group-item>
      }
    </volt-toggle-group>
  `,
  styles: `
    /* Volt's styling contract: re-scope its tokens instead of overriding component classes.
       (The item's \`class\` input styles its host, not the inner button that carries
       data-selected, so tokens are the way to restyle the selected state.) */
    .switcher {
      --primary: var(--color-main-950);
      --primary-foreground: var(--color-main-50);
      --muted: var(--color-main-100);
      --muted-foreground: var(--color-main-950);
      --foreground: var(--color-main-950);
      --radius: 9999px;
    }
    /* Compact pills: the item's own size scale has no step below "sm". */
    .switcher button {
      height: 1.625rem;
      min-width: 2.25rem;
      padding-inline: 0.625rem;
      font-size: 0.75rem;
      line-height: 1;
    }
    /* The selected pill is already high-contrast; keep keyboard focus as a tight inner ring. */
    .switcher button:focus-visible {
      --tw-ring-offset-width: 0px;
      --tw-ring-color: var(--color-main-400);
    }
    .switcher button:not([data-selected]):hover {
      background: var(--color-main-100);
    }
  `,
})
export class LanguageSwitcher {
  protected readonly i18n = injectAppI18n();
  protected readonly selected = computed(() => [this.i18n.locale()]);

  protected label(locale: Locale): string {
    return LABELS[locale] ?? locale.toUpperCase();
  }

  protected name(locale: Locale): string {
    return NAMES[locale] ?? locale;
  }

  protected switchTo(value: string[]): void {
    const locale = value[0];
    if (!locale || locale === this.i18n.locale() || !this.i18n.locales.includes(locale)) return;
    void this.i18n.setLocale(locale).catch((error: unknown) => console.error(error));
  }
}
