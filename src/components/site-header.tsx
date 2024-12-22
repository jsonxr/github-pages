import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';
import { HamburgerMenu } from './HamburgerMenu';
import { type Icon, Icons } from './icons';
import { MainNav } from './main-nav';
import { ModeToggle } from './ModeToggle';
import { buttonVariants } from './ui/button';

export const SiteHeader = () => {
  return (
    <HeaderContainer>
      <MainNav />
      <EndContainer>
        <IconLink
          href={siteConfig.links.github}
          title="GitHub"
          icon={Icons.gitHub}
        />
        <ModeToggle />
        <HamburgerMenu />
      </EndContainer>
    </HeaderContainer>
  );
};

//----------------------------------------------------------------------------
// EndContainer
//----------------------------------------------------------------------------
const EndContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-1 items-center justify-end space-x-2">
    <nav className="flex items-center">{children}</nav>
  </div>
);

//----------------------------------------------------------------------------
// HeaderContainer
//----------------------------------------------------------------------------
const HeaderContainer = ({ children }: { children: ReactNode }) => (
  <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 max-w-screen-2xl items-center">
      {children}
    </div>
  </header>
);

//----------------------------------------------------------------------------
// IconLink
//----------------------------------------------------------------------------
type IconLinkProps = {
  title: string;
  href: string;
  icon: Icon;
};
const IconLink = ({ title, href, icon: Icon }: IconLinkProps) => {
  return (
    <nav className="flex items-center">
      <Link href={href} rel="noreferrer">
        <div
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'w-10 px-0 hidden sm:inline-flex'
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="sr-only">{title}</span>
        </div>
      </Link>
    </nav>
  );
};
