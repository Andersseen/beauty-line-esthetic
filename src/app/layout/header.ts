import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import {
  NavbarDirective,
  NavbarMenuDirective,
  NavbarTriggerDirective,
} from '@quartz-headless/primitives';
import { VoltNativeButton, VoltSeparator } from '@voltui/components';
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
    VoltSeparator,
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
      <div class="relative mx-auto flex max-w-6xl items-center justify-between px-3 text-xs font-light uppercase md:px-8">
        <a [routerLink]="i18n.path('/')" class="text-main-100 no-underline" aria-label="Beauty Line">
          <app-logo />
        </a>

        <button
          qzNavbarTrigger
          voltButton
          variant="ghost"
          size="icon"
          type="button"
          class="size-[50px] rounded-full sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 shadow-md ring-pink-100/30 transition-all duration-200 hover:bg-main-400 hover:ring-8 data-[hover]:bg-main-400 data-[hover]:text-white focus-visible:bg-main-400"
          [attr.aria-label]="i18n.t('nav.menu')"
        >
          <app-menu-button [open]="open()" />
        </button>

        <div class="flex items-center gap-1 sm:gap-2">
          <app-language-switcher />
          <volt-separator orientation="vertical" class="hidden h-5 bg-white/30 sm:block" />
          <app-theme-toggle />
        </div>
      </div>

      <nav qzNavbarMenu class="menu mx-auto max-w-6xl px-4 md:px-8" [attr.aria-label]="i18n.t('nav.menu')">
        <!-- The panel grows and shrinks with the header (grid rows 0fr <-> 1fr, see styles);
             presence keeps the links mounted while it closes. -->
        <div class="min-h-0 overflow-hidden">
          <div
            *movePresence="open()"
            class="mb-20 flex flex-col gap-12 md:mb-8 md:flex-row md:justify-between md:gap-0"
            [moveInitial]="{ opacity: 0 }"
            [moveAnimate]="{ opacity: 1 }"
            [moveExit]="{ opacity: 0 }"
            [moveDuration]="menuMs"
            [moveEasing]="menuEase"
          >
            <ul class="links mt-10 flex flex-col flex-wrap items-center lg:flex-row" role="list">
              @for (link of links; track link.path; let index = $index) {
                <li>
                  <a
                    [routerLink]="i18n.path(link.path)"
                    class="block pt-[10px] pr-[30px] text-[32px] font-light text-white uppercase no-underline"
                    (pointerenter)="hovered.set(index)"
                    (pointerleave)="hovered.set(null)"
                    (click)="open.set(false)"
                  >
                    <span
                      class="inline-block overflow-hidden whitespace-pre"
                      [moveText]="{ y: [36, 0], opacity: [0, 1] }"
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
        </div>
      </nav>

      <!-- Dim layer that drops down with the menu and rolls back up when it closes. -->
      <div
        class="scrim absolute top-full left-0 w-full bg-main-900/50"
        [class.open]="open()"
        aria-hidden="true"
        (click)="open.set(false)"
      ></div>
    </header>
  `,
  styles: `
    /* Menu open/close: the header grows to fit the panel and shrinks back, as on the original
       site. Quartz hides a closed menu with an inline \`display: none\` (which would cut the
       closing animation), so the closed state here is 0fr rows + visibility instead; Quartz still
       sets aria-hidden and owns focus. */
    .menu {
      display: grid !important;
      grid-template-rows: 0fr;
      visibility: hidden;
      transition:
        grid-template-rows 1s cubic-bezier(0.76, 0, 0.24, 1),
        visibility 0s linear 1s;
    }
    .menu[data-qz-open] {
      grid-template-rows: 1fr;
      visibility: visible;
      transition: grid-template-rows 1s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .scrim {
      height: 0;
      pointer-events: none;
      transition: height 1s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .scrim.open {
      height: 100dvh;
      pointer-events: auto;
    }
    @media (prefers-reduced-motion: reduce) {
      .menu,
      .menu[data-qz-open],
      .scrim {
        transition: none;
      }
    }
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
  protected readonly menuMs = 1000;
  protected readonly menuEase = 'cubic-bezier(0.76, 0, 0.24, 1)';

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.open.set(false));
  }
}
