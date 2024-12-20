import { posts } from '#site/content';
import { PostList } from '@/components/PostList';
import { Tag } from '@/components/Tag';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getAllTagCounts,
  getPostsByTagSlug,
  slug,
  sortTagsByCount,
} from '@/lib/utils';
import { Metadata } from 'next';

export const dynamic = 'force-static';

type Params = { tag: string };
type TagPageProps = {
  params: Promise<Params>;
};
export default async function TagPage(props: TagPageProps) {
  const { tag } = await props.params;
  const title = tag.split('-').join(' ');

  const displayPosts = getPostsByTagSlug(posts, tag);
  const tags = getAllTagCounts(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1
            className="inline-block font-black text-4xl lg:text-5xl"
            autoCapitalize="on"
          >
            {title}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          <PostList data={displayPosts} />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags.map((t) => (
              <Tag key={t} tag={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

//----------------------------------------------------------------------------
// Helper functions
//----------------------------------------------------------------------------

export async function generateStaticParams(): Promise<Params[]> {
  const tags = getAllTagCounts(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: tag,
    description: `Posts on the topic of ${tag}`,
  };
}
