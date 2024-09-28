"use client";
import { useReducer } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  NavbarBrand,
} from "@nextui-org/react";
import Link from "next/link";
import { DeskNavigation } from "./desk-navigation";
import { ReactNode } from "react";

export interface NavigationLink {
  label: string;
  route: string;
}

export const HeaderNavigation = ({
  logo,
  navLinks,
  themeSwitcher,
}: {
  logo: ReactNode | string;
  navLinks: NavigationLink[];
  themeSwitcher: ReactNode;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useReducer((current) => !current, false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <Link href="/">{logo}</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-1" justify="center">
        <DeskNavigation navList={navLinks} />
      </NavbarContent>
      <NavbarContent justify="end">{themeSwitcher}</NavbarContent>
      <NavbarMenu>
        {navLinks.map((value: NavigationLink, index: number) => (
          <NavbarMenuItem
            key={`${value.label}-${index}`}
            className="text-center"
          >
            <Button
              style={{
                color: "var(--foreground-color)",
              }}
              variant="light"
              size="lg"
              onPress={() => setIsMenuOpen()}
            >
              <Link href={value.route}>{value.label}</Link>
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
