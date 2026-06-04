import { Beat } from "../../types/studio";
import { useStudioStore } from "../../store/studioStore";
import { CategoryFilter } from "./CategoryFilter";
import { AssetCard } from "./AssetCard";

interface AssetBrowserProps {
    beatLibrary: Beat[];
}

export function AssetBrowser({ beatLibrary }: AssetBrowserProps) {
    const selectedCategory = useStudioStore((state) => state.selectedCategory);

    const filteredBeats = beatLibrary.filter(
        (beat) => selectedCategory === "All" || beat.category === selectedCategory
    );

    return (
        <aside className="border-r border-ink/10 overflow-y-auto bg-ivory text-ink h-full">
            <div className="p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-wine">
                    Beat Assets
                </p>

                <CategoryFilter />

                <div className="space-y-4 mt-10 pb-8">
                    {filteredBeats.map((beat) => (
                        <AssetCard key={beat.id} beat={beat} />
                    ))}
                    {filteredBeats.length === 0 && (
                        <p className="text-sm font-mono text-ink/50 mt-4">
                            No assets in this category.
                        </p>
                    )}
                </div>
            </div>
        </aside>
    );
}
