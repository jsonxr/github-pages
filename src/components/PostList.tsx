import { Post } from '#site/content';
import { formatDate } from '../lib/utils';
import { PostItem } from './PostItem';

type PostListProps = {
  data: Post[];
};
export const PostList = ({ data }: PostListProps) => {
  return (
    <ul className="flex flex-col">
      {data.map((post) => {
        const { slug, date, title, description, tags } = post;
        return (
          <li key={slug}>
            <PostItem
              slug={slug}
              tags={tags}
              date={formatDate(date)}
              title={title}
              description={description}
            />
          </li>
        );
      })}
    </ul>
  );
};
