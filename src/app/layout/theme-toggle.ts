import { afterNextRender, ChangeDetectionStrategy, Component, DOCUMENT, inject, signal } from '@angular/core';
import { LmnMoonIcon } from 'lumen-icons/moon';
import { LmnSunIcon } from 'lumen-icons/sun';
import { applyVoltTheme, VoltNativeButton } from '@voltui/components';

import { injectAppI18n } from '../i18n/inject';

const STORAGE_KEY = 'theme';

/**
 * Light / dark switch for the header. Volt owns the mechanism (`applyVoltTheme` toggles `.dark` on
 * <html>); the choice is remembered in localStorage and re-applied before first paint by the
 * inline script in index.html. The server always renders light, so the icon settles after hydration.
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [VoltNativeButton, LmnMoonIcon, LmnSunIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      voltButton
      variant="ghost"
      size="icon"
      type="button"
      class="relative size-8 rounded-full sm:size-9 text-white transition-colors duration-200 data-[hover]:bg-white/15 data-[hover]:text-white"
      [attr.aria-label]="i18n.t('nav.darkMode')"
      [attr.aria-pressed]="dark()"
      (click)="toggle()"
    >
      <!-- Both icons stay mounted and cross-fade: removing one mid-animation (the stored theme
           applying right after hydration) makes Angular Movement throw, see DOGFOODING.md. -->
      <span class="icon" [class.shown]="!dark()"><lmn-moon [size]="20" /></span>
      <span class="icon" [class.shown]="dark()"><lmn-sun [size]="20" /></span>
    </button>
  `,
  styles: `
    .icon {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      opacity: 0;
      rotate: 90deg;
      scale: 0.6;
      transition:
        opacity 0.3s ease,
        rotate 0.5s cubic-bezier(0.22, 1, 0.36, 1),
        scale 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .icon.shown {
      opacity: 1;
      rotate: 0deg;
      scale: 1;
    }
    @media (prefers-reduced-motion: reduce) {
      .icon {
        transition: opacity 0.2s ease;
      }
    }
  `,
})
export class ThemeToggle {
  protected readonly i18n = injectAppI18n();
  protected readonly dark = signal(false);
  private readonly document = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => this.dark.set(this.document.documentElement.classList.contains('dark')));
  }

  protected toggle(): void {
    const dark = !this.dark();
    this.dark.set(dark);
    applyVoltTheme({ dark }, this.document);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  }
}
