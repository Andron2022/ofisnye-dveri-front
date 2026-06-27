import type { Metadata } from "next";
import { KallesPortfolioArchivePage } from "@src/components/content/KallesContentViews";
import { buildSeoMetadata } from "@src/lib/seo/site";
import { getWpPortfolioProjects } from "@src/lib/wp/content";
import type { WpContentPreview } from "@src/lib/wp/content";

export const revalidate = 300;

export const metadata: Metadata = buildSeoMetadata({
    title: "Портфолио",
    description: "Портфолио реализованных проектов с дверями для офисов, общественных пространств и коммерческих интерьеров.",
    path: "/portfolio",
});

export default async function PortfolioPage() {
    let projects: WpContentPreview[] = [];

    try {
        projects = await getWpPortfolioProjects(100);
    } catch (error) {
        console.error("Failed to load WP portfolio archive", error);
    }

    return (
        <KallesPortfolioArchivePage
            items={projects}
            emptyState={{
                title: "Проекты скоро появятся",
                description: "Добавьте опубликованные объекты portfolio_project в WordPress — после этого они появятся в этом разделе.",
            }}
        />
    );
}
