import type { Metadata } from 'next';
import { /*Geist, Geist_Mono, */ Inter } from 'next/font/google';
import { Providers } from '../components/providers';
import { SiteHeader } from '../components/site-header';
import { cn } from '../lib/utils';
import './globals.css';

const font = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

// const geistMono = Geist_Mono({
//   variable: '--font-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Jason Rowland',
  description: 'Personal development',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // https://github.com/pacocoursey/next-themes#:~:text=suppressHydrationWarning
  return (
    <html lang="en" className="scroll-pt-[3.5rem]" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/path/to/favicon.svg" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          font.variable
        )}
      >
        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
