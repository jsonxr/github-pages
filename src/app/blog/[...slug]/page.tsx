import { Post, posts } from '#site/content';
import { MdxContent } from '@/components/MdxContent';
import { Tag } from '@/components/Tag';
import '@/styles/mdx.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from 'src/config/siteConfig';

type Params = { slug: string[] };
type PostPageProps = {
  params: Promise<Params>;
};
export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  // const slug = (await params)?.slug?.join('/');
  // const post = posts.find((p) => p.slugAsParams === slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <MdxContent code={post.body} />
    </article>
  );
}

//----------------------------------------------------------------------------
// Helper functions
//----------------------------------------------------------------------------

export const dynamic = 'force-static';

export async function generateStaticParams(): Promise<Params[]> {
  return posts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);
  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set('title', post.title);
  //const imageUrl = `/api/og?${ogSearchParams.toString()}`;

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: post.slug,
      // images: [
      //   {
      //     url: imageUrl,
      //     width: 1200,
      //     height: 630,
      //     alt: post.title,
      //   },
      // ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.title,
    //   description: post.description,
    //   //images: [imageUrl],
    // },
  };
}

async function getPostFromParams(
  params: Promise<Params>
): Promise<Post | undefined> {
  const slug = (await params)?.slug?.join('/');
  const post = posts.find((p) => p.slugAsParams === slug);
  return post;
}
