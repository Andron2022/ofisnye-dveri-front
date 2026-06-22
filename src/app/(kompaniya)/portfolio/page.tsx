import type { Metadata } from "next";
import { WpContentArchivePage } from "@src/components/content/WpContentViews";
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
        projects = await getWpPortfolioProjects(20);
    } catch (error) {
        console.error("Failed to load WP portfolio archive", error);
    }

    return (
        <WpContentArchivePage
            eyebrow="Портфолио"
            title="Портфолио проектов"
            description="Реализованные объекты, решения по дверям, комплектации и фурнитуре для коммерческих интерьеров."
            emptyTitle="Проекты скоро появятся"
            emptyDescription="Добавьте опубликованные объекты portfolio_project в WordPress — после этого они появятся в этом разделе."
            items={projects}
        />
    );
}
