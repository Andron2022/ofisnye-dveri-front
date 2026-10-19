import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KallesPortfolioArchivePage } from "@src/components/content/KallesContentViews";
import {
  buildWpArchiveMetadata,
  getWpPortfolioProjectsPage,
} from "@src/lib/wp/content";
import { parseContentPage } from "@src/lib/content/pagination";

type Props = { searchParams: Promise<{ page?: string | string[] }> };

async function getPageNumber({ searchParams }: Props) {
  const page = parseContentPage((await searchParams).page);
  if (page === null) notFound();
  return page;
}

export const revalidate = 300;

export async function generateMetadata(props: Props): Promise<Metadata> {
  return buildWpArchiveMetadata({
    slug: "portfolio",
    title: "Портфолио",
    description:
      "Портфолио реализованных проектов с дверями для офисов, общественных пространств и коммерческих интерьеров.",
    path: "/portfolio",
    page: await getPageNumber(props),
  });
}

export default async function PortfolioPage(props: Props) {
  const page = await getPageNumber(props);
  const projects = await getWpPortfolioProjectsPage(page);
  if (page > projects.totalPages) notFound();

  return (
    <KallesPortfolioArchivePage
      items={projects.items}
      pagination={projects}
      emptyState={{
        title: "Проекты скоро появятся",
        description:
          "Добавьте опубликованные объекты portfolio_project в WordPress — после этого они появятся в этом разделе.",
      }}
    />
  );
}
