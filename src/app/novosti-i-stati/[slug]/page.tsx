import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KallesNewsDetailPage } from "@src/components/content/KallesContentViews";
import {
  buildArticleJsonLd,
  buildBreadcrumbListJsonLd,
  serializeJsonLd,
} from "@src/lib/seo/site";
import { buildWpContentMetadata, getWpPostBySlug } from "@src/lib/wp/content";

export const revalidate = 300;

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWpPostBySlug(slug, { includeRelated: false });

  if (!post) {
    return {
      title: "Материал не найден",
      robots: { index: false, follow: false },
    };
  }

  return buildWpContentMetadata(post);
}

export default async function NewsOrArticlePage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const post = await getWpPostBySlug(slug);

  if (!post) return notFound();

  const image = post.featuredImage;
  const description = post.metaDescription || post.excerpt;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            buildArticleJsonLd({
              title: post.metaTitle || post.title,
              description,
              path: post.path,
              date: post.date,
              modified: post.modified,
              image,
              seo: post.seo,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            buildBreadcrumbListJsonLd([
              { name: "Главная", path: "/" },
              { name: "Новости и статьи", path: "/novosti-i-stati" },
              { name: post.title, path: post.path },
            ]),
          ),
        }}
      />
      <KallesNewsDetailPage item={post} />
    </>
  );
}
