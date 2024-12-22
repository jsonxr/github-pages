import { posts } from '#site/content';
import { PostItem } from '@/components/post-item';
import { sortPosts } from '@/lib/utils';
import { Metadata } from 'next';
import { QueryPagination } from '../../components/query-pagination';

const POST_PER_PAGE = 2;

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Articles I find interesting',
};

type BlogPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};
const BlogPage = async (props: BlogPageProps) => {
  const params = await props.searchParams;
  const currentPage = Number(params?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POST_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POST_PER_PAGE * (currentPage - 1),
    POST_PER_PAGE * currentPage
  );

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
      <hr className="mt-8" />
      <ul className="flex flex-col">
        {displayPosts.map((post) => {
          const { slug, date, title, description } = post;
          return (
            <li key={slug}>
              <PostItem
                slug={slug}
                date={date}
                title={title}
                description={description}
              />
            </li>
          );
        })}
      </ul>
      <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
    </div>
  );
};

export default BlogPage;
