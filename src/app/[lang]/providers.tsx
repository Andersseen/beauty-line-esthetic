'use client';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import React, { useState, useEffect } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        themes={['light', 'dark']}
      >
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
