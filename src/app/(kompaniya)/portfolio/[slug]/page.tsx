import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KallesPortfolioDetailPage } from "@src/components/content/KallesContentViews";
import {
  buildBreadcrumbListJsonLd,
  buildCreativeWorkJsonLd,
  serializeJsonLd,
} from "@src/lib/seo/site";
import {
  buildWpContentMetadata,
  getWpPortfolioProjectBySlug,
} from "@src/lib/wp/content";

export const revalidate = 300;

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getWpPortfolioProjectBySlug(slug, { includeRelated: false });

  if (!project) {
    return {
      title: "Проект не найден",
      robots: { index: false, follow: false },
    };
  }

  return buildWpContentMetadata(project);
}

export default async function PortfolioDetailPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const project = await getWpPortfolioProjectBySlug(slug);

  if (!project) return notFound();

  const image = project.portfolio?.heroImage || project.featuredImage;
  const description = project.metaDescription || project.excerpt;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            buildCreativeWorkJsonLd({
              title: project.metaTitle || project.title,
              description,
              path: project.path,
              date: project.date,
              modified: project.modified,
              image,
              seo: project.seo,
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
              { name: "Портфолио", path: "/portfolio" },
              { name: project.title, path: project.path },
            ]),
          ),
        }}
      />
      <KallesPortfolioDetailPage item={project} />
    </>
  );
}
