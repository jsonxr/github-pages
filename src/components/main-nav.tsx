'use client';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Icons } from './icons';

export function MainNav() {
  return (
    <MainNavContainer>
      <LogoLink />
      <PathLink href="/blog" title="Blog" />
      <PathLink href="/about" title="About" />
    </MainNavContainer>
  );
}

//----------------------------------------------------------------------------
// Container
//----------------------------------------------------------------------------
const MainNavContainer = ({ children }: { children: ReactNode }) => (
  <nav className="flex items-center space-x-4 lg:space-x-6">{children}</nav>
);

//----------------------------------------------------------------------------
// LogoLink
//----------------------------------------------------------------------------

const LogoLink = () => (
  <Link href="/" className="mr-6 flex items-center space-x-2">
    <Icons.logo className="h-6 w-6" />
    <span className="font-bold">{siteConfig.name}</span>
  </Link>
);

//----------------------------------------------------------------------------
// PathLink
//----------------------------------------------------------------------------

type PathLinkProps = {
  href: string;
  title: string;
};
const PathLink = ({ href, title }: PathLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block',
        pathname === href ? 'text-foreground' : 'text-foreground/60'
      )}
    >
      {title}
    </Link>
  );
};
