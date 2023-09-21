import { useState, ReactNode } from 'react';
import { Comments } from 'pliny/comments';
import { formatDate } from 'pliny/utils/formatDate';
import { CoreContent } from 'pliny/utils/contentlayer';

import type { Blog } from 'contentlayer/generated';

import siteMetadata from '@/data/siteMetadata';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import SectionContainer from '@/components/SectionContainer';
import { BlogSEO } from '@/components/SEO';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import BlogMeta from '@/components/blog/BlogMeta';
import BlogTags from '@/components/blog/BlogTags';

interface LayoutProps {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const [loadComments, setLoadComments] = useState(false);

  const { path, slug, date, title, tags, readingTime } = content;

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/${path}`} {...content} />

      <ScrollTopAndComment />

      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 dark:border-gray">
              <div className='space-y-6'>
                <PageTitle>{title}</PageTitle>
                <BlogTags tags={tags} />
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <BlogMeta date={date} slug={slug} readingTime={readingTime} />
                  </div>
                </dl>
              </div>
            </div>
          </header>

          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">{children}</div>
            </div>
            {siteMetadata.comments && (
              <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                {!loadComments && <button onClick={() => setLoadComments(true)}>Load Comments</button>}
                {loadComments && <Comments commentsConfig={siteMetadata.comments} slug={slug} />}
              </div>
            )}

            <footer>
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                {prev && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${prev.path}`}
                      className="text-primary hover:text-sky-600 dark:hover:text-sky-400"
                      aria-label={`Previous post: ${prev.title}`}
                    >
                      &larr; {prev.title}
                    </Link>
                  </div>
                )}
                {next && (
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${next.path}`}
                      className="text-primary hover:text-sky-600 dark:hover:text-sky-400"
                      aria-label={`Next post: ${next.title}`}
                    >
                      {next.title} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
