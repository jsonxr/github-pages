import { Mail } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { Icons } from './icons';

export function SiteFooter() {
  return (
    <footer>
      <div className="mb-6 mt-14 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <a href="mailto:jsonxr@gmail.com" rel="noreferrer">
            <span className="sr-only">Mail</span>
            <Mail className="h-6 w-6" />
          </a>
          <a href={siteConfig.links.github} rel="noreferrer">
            <span className="sr-only">GitHub</span>
            <Icons.gitHub className="h-6 w-6" />
          </a>
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
          {siteConfig.author}
        </div>
      </div>
    </footer>
  );
}
