import { BlogPosts } from '@/components/views/blog/posts';
import type { Post } from '@/types';
import { getStaticMetadata } from '@/utils/metadata';
import { buildOgImageUrl } from '@/utils/og';
import { allBlogs as generatedBlogs } from 'contentlayer/generated';

import Header from './header';

const allowInProgress = process.env.NODE_ENV === 'development';
const allBlogs: Array<Post> = generatedBlogs
  .filter((it) => it.slug !== 'about' && (allowInProgress || !it.inProgress))
  .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
  .map((blog) => ({ ...blog } as Post));

export default function BlogPage() {
  return (
    <>
      <Header />
      <BlogPosts posts={allBlogs} />
    </>
  );
}

export const metadata = getStaticMetadata({
  title: 'Blog',
  description:
    // eslint-disable-next-line max-len
    'Blog posts by Jahir Fiquitiva. Here I share some thoughts, stories, information and more about software development, programming, tech or my personal life',
  exactUrl: 'https://jahir.dev/blog',
  keywords: [
    'tech',
    'software',
    'development',
    'thoughts',
    'opinions',
    'blog',
    'content',
    'story',
    'storytelling',
    'news',
  ],
  image: buildOgImageUrl('blog'),
});
