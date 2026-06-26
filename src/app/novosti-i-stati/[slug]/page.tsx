import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WpContentDetailPage } from "@src/components/content/WpContentViews";
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

    if (!post) notFound();

    return (
        <WpContentDetailPage
            item={post}
            eyebrow="Новости и статьи"
            backHref="/novosti-i-stati"
            backLabel="Вернуться к материалам"
            relatedProductsSection={{
                title: "Связанные товары",
                emptyMessage: "Связанные товары не выбраны.",
            }}
            relatedPostsSection={{
                title: "Связанные новости и статьи",
                emptyMessage: "Связанные материалы не выбраны.",
            }}
        />
    );
}
