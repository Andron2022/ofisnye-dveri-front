import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WpContentDetailPage } from "@src/components/content/WpContentViews";
import { buildWpContentMetadata, getWpPortfolioProjectBySlug } from "@src/lib/wp/content";

export const revalidate = 300;

type PageParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getWpPortfolioProjectBySlug(slug);

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

    if (!project) notFound();

    return (
        <WpContentDetailPage
            item={project}
            eyebrow="Портфолио"
            backHref="/portfolio"
            backLabel="Вернуться к портфолио"
        />
    );
}
