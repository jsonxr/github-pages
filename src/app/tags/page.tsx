import { posts } from '#site/content';
import { getAllTagCounts, sortTagsByCount } from '@/lib/utils';
import { Metadata } from 'next';
import { Tag } from '../../components/Tag';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Tags',
  description: 'Topics of interest',
};

export default async function TagsPage() {
  const tags = getAllTagCounts(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Tags</h1>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-3">
        {sortedTags.map((tag) => (
          <Tag key={tag} tag={tag} count={tags[tag]} />
        ))}
      </div>
    </div>
  );
}
