import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KallesNewsArchivePage } from "@src/components/content/KallesContentViews";
import { buildWpArchiveMetadata, getWpPostsPage } from "@src/lib/wp/content";
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
    slug: "novosti-i-stati",
    title: "Новости и статьи",
    description:
      "Новости и статьи о выборе дверей, комплектации, доставке, установке и проектных решениях для коммерческих интерьеров.",
    path: "/novosti-i-stati",
    page: await getPageNumber(props),
  });
}

export default async function NewsAndArticlesPage(props: Props) {
  const page = await getPageNumber(props);
  const posts = await getWpPostsPage(page);
  if (page > posts.totalPages) notFound();

  return (
    <KallesNewsArchivePage
      items={posts.items}
      pagination={posts}
      emptyState={{
        title: "Публикации скоро появятся",
        description:
          "Добавьте опубликованные записи в WordPress — после этого они появятся в этом разделе.",
      }}
    />
  );
}
