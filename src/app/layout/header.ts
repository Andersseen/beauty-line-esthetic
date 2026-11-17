import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import {
  NavbarDirective,
  NavbarMenuDirective,
  NavbarTriggerDirective,
} from '@quartz-headless/primitives';
import { VoltNativeButton } from '@voltui/components';
import {
  MoveAnimateDirective,
  MovePresenceDirective,
  MoveTextDirective,
} from 'angular-movement';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { injectAppI18n, type AppMessageKey } from '../i18n/inject';
import { LanguageSwitcher } from './language-switcher';
import { Logo } from './logo';
import { MenuButton } from './menu-button';
import { ThemeToggle } from './theme-toggle';

interface NavLink {
  readonly label: AppMessageKey;
  readonly path: string;
  readonly image: string;
}

const LINKS: readonly NavLink[] = [
  { label: 'nav.home', path: '/', image: '/09.webp' },
  { label: 'nav.about', path: '/about', image: '/02.webp' },
  { label: 'nav.treatments', path: '/prices', image: '/13.webp' },
  { label: 'nav.contact', path: '/contact', image: '/15.webp' },
];

/**
 * Fixed brand header with a full-width disclosure menu.
 *
 * Quartz's navbar primitive owns the behaviour (aria wiring, Escape, focus trap, scroll lock);
 * Angular Movement owns the motion (letter-by-letter link reveal, overlay fade).
 */
@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    NavbarDirective,
    NavbarMenuDirective,
    NavbarTriggerDirective,
    VoltNativeButton,
    MoveAnimateDirective,
    MovePresenceDirective,
    MoveTextDirective,
    LanguageSwitcher,
    Logo,
    MenuButton,
    ThemeToggle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      qzNavbar
      [(menuOpen)]="open"
      [closeMenuOnDesktop]="false"
      class="fixed z-50 box-border w-full bg-main-500 transition-colors duration-300 dark:bg-main-800"
    >
      <div class="relative flex items-center justify-between px-2 text-xs font-light uppercase">
        <a [routerLink]="i18n.path('/')" class="text-main-100 no-underline" aria-label="Beauty Line">
          <app-logo />
        </a>

        <button
          qzNavbarTrigger
          voltButton
          variant="ghost"
          size="icon"
          type="button"
          class="absolute top-1/2 left-1/2 size-[50px] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md ring-pink-100/30 transition-all duration-200 hover:bg-main-400 hover:ring-8 data-[hover]:bg-main-400 data-[hover]:text-white focus-visible:bg-main-400"
          [attr.aria-label]="i18n.t('nav.menu')"
        >
          <app-menu-button [open]="open()" />
        </button>

        <div class="flex items-center gap-0.5 sm:gap-1">
          <app-theme-toggle />
          <app-language-switcher />
        </div>
      </div>

      <nav qzNavbarMenu class="overflow-hidden px-4 md:px-8" [attr.aria-label]="i18n.t('nav.menu')">
        @if (open()) {
          <div
            class="mb-20 flex flex-col gap-12 md:mb-8 md:flex-row md:justify-between md:gap-0"
            [moveInitial]="{ opacity: 0, y: -24 }"
            [moveAnimate]="{ opacity: 1, y: 0 }"
            [moveDuration]="600"
          >
            <ul class="links mt-10 flex flex-col flex-wrap items-center lg:flex-row" role="list">
              @for (link of links; track link.path; let index = $index) {
                <li>
                  <a
                    [routerLink]="i18n.path(link.path)"
                    class="block pt-[10px] pr-[30px] text-[32px] font-light text-main-100 uppercase no-underline"
                    (pointerenter)="hovered.set(index)"
                    (pointerleave)="hovered.set(null)"
                    (click)="open.set(false)"
                  >
                    <span
                      class="inline-block overflow-hidden whitespace-pre"
                      [moveText]="{ y: ['100%', '0%'], opacity: [0, 1] }"
                      moveTextSplit="chars"
                      [moveTextStagger]="20"
                      [moveDuration]="1000"
                      >{{ i18n.t(link.label) }}</span
                    >
                  </a>
                </li>
              }
            </ul>
            <div
              class="relative hidden h-[250px] w-[300px] overflow-hidden rounded-lg transition-opacity duration-300 md:block"
              [class.opacity-0]="hovered() === null"
              aria-hidden="true"
            >
              <img
                [src]="links[hovered() ?? 0]!.image"
                alt=""
                class="absolute inset-0 size-full rounded-lg object-cover"
              />
            </div>
          </div>
        }
      </nav>

      <ng-container *movePresence="open()">
        <div
          class="absolute top-full left-0 h-dvh w-full bg-main-900/50"
          aria-hidden="true"
          [moveInitial]="{ opacity: 0 }"
          [moveAnimate]="{ opacity: 1 }"
          [moveExit]="{ opacity: 0 }"
          [moveDuration]="400"
          (click)="open.set(false)"
        ></div>
      </ng-container>
    </header>
  `,
  styles: `
    .links:has(a:hover, a:focus-visible) a:not(:hover):not(:focus-visible) {
      filter: blur(4px);
      opacity: 0.6;
    }
    .links a {
      transition:
        filter 0.3s,
        opacity 0.3s;
    }
  `,
})
export class Header {
  protected readonly i18n = injectAppI18n();
  protected readonly links = LINKS;
  protected readonly open = signal(false);
  protected readonly hovered = signal<number | null>(null);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.open.set(false));
  }
}
