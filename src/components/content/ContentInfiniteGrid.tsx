"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

type ContentInfiniteGridProps = {
    children: ReactNode;
    initialCount?: number;
    step?: number;
    className: string;
    itemClassName: string;
};

export function ContentInfiniteGrid({
    children,
    initialCount = 6,
    step = 6,
    className,
    itemClassName,
}: ContentInfiniteGridProps) {
    const items = useMemo(() => Array.isArray(children) ? children : [children], [children]);
    const [visibleCount, setVisibleCount] = useState(initialCount);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const hasMore = visibleCount < items.length;

    useEffect(() => {
        if (!hasMore || !sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setVisibleCount((current) => Math.min(current + step, items.length));
                }
            },
            { rootMargin: "400px 0px" },
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, items.length, step]);

    return (
        <>
            <div className={className}>
                {items.slice(0, visibleCount).map((item, index) => (
                    <div key={index} className={itemClassName}>
                        {item}
                    </div>
                ))}
            </div>

            {hasMore ? (
                <div ref={sentinelRef} className="py-4 text-center text-muted fs-14">
                    Загружаем ещё...
                </div>
            ) : null}
        </>
    );
}
