import { Post } from '#site/content';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

/**
 * Generate a slug.
 * @param  {string} value
 *   String of text to slugify
 * @return {string}
 *   A unique slug string
 */
export function slug(str: string): string {
  return (
    str
      // Convert to lowercase
      .toLowerCase()
      // Remove everything that's not a letter, number, or space
      .replace(/[^a-z0-9\s]+/g, '')
      // Trim leading/trailing spaces just in case
      .trim()
      // Replace one or more spaces with a single dash
      .replace(/\s+/g, '-')
  );
}

/**
 * Return record of tags and their counts
 * @param posts
 * @returns
 */
export function getAllTagCounts(posts: Post[]): Record<string, number> {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.map((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });
  return tags;
}

/**
 * Sorts list of tags by their count
 * @param tags
 * @returns
 */
export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getPostsByTagSlug(posts: Post[], tag: string): Post[] {
  return posts.filter((post) => {
    if (!post.tags) {
      return false;
    }
    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}
