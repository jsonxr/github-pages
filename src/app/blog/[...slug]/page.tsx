import { posts } from '#site/content';
import { notFound } from 'next/navigation';

type Params = { slug: string[] };

export async function generateStaticParams(): Promise<Params[]> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

type PostPageProps = {
  params: Promise<Params>;
};
export default async function PostPage({ params }: PostPageProps) {
  const slug = (await params)?.slug?.join('/');
  const post = posts.find((p) => p.slugAsParams === slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
    </article>
  );
}
