import type { Metadata } from "next";
import { WpContentArchivePage } from "@src/components/content/WpContentViews";
import { buildSeoMetadata } from "@src/lib/seo/site";
import { getWpPosts } from "@src/lib/wp/content";
import type { WpContentPreview } from "@src/lib/wp/content";

export const revalidate = 300;

export const metadata: Metadata = buildSeoMetadata({
    title: "Новости и статьи",
    description: "Новости и статьи о выборе дверей, комплектации, доставке, установке и проектных решениях для коммерческих интерьеров.",
    path: "/novosti-i-stati",
});

export default async function NewsAndArticlesPage() {
    let posts: WpContentPreview[] = [];

    try {
        posts = await getWpPosts(20);
    } catch (error) {
        console.error("Failed to load WP posts archive", error);
    }

    return (
        <WpContentArchivePage
            eyebrow="Новости и статьи"
            title="Новости и статьи"
            description="Полезные материалы о выборе дверей, комплектации, фурнитуре, доставке и установке."
            emptyTitle="Публикации скоро появятся"
            emptyDescription="Добавьте опубликованные записи в WordPress — после этого они появятся в этом разделе."
            items={posts}
        />
    );
}
