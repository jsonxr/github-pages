import { slug } from '@/lib/utils';
import Link from 'next/link';
import { badgeVariants } from './ui/badge';

const SHOW_COUNT_MIN = 5;

type TagProps = {
  tag: string;
  current?: boolean;
  count?: number;
};
export const Tag = ({ tag, current, count = 0 }: TagProps) => {
  return (
    <Link
      className={badgeVariants({
        variant: current ? 'default' : 'secondary',
        className: 'no-underline rounded-md',
      })}
      href={`/tags/${slug(tag)}`}
    >
      {tag} {count > SHOW_COUNT_MIN ? `(${count})` : null}
    </Link>
  );
};
