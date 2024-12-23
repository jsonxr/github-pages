import { posts } from '#site/content';
import { PostList } from '@/components/PostList';
import { QueryPagination } from '@/components/query-pagination';
import { Tag } from '@/components/Tag';
import { getAllTagCounts, sortPosts, sortTagsByCount } from '@/lib/utils';
import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

const POST_PER_PAGE = 10;

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Articles I find interesting',
};

type Params = { page?: string };
type BlogPageProps = {
  searchParams: Promise<Params>;
};
export default async function BlogPage(props: BlogPageProps) {
  const params = await props.searchParams;
  const currentPage = Number(params?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POST_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POST_PER_PAGE * (currentPage - 1),
    POST_PER_PAGE * currentPage
  );

  const tags = getAllTagCounts(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            My learnings on development
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          <PostList data={displayPosts} />
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags.map((tag) => (
              <Tag key={tag} tag={tag} count={tags[tag]} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POST_PER_PAGE);
  const params = Array(totalPages)
    .fill('')
    .map((_, i) => ({
      page: `${i + 1}`,
    }));
  return params;
}
