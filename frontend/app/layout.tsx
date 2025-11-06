import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Cobalt Downloader',
  description: 'Modernized frontend built with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
