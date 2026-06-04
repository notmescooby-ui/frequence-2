import { useStudioStore } from "../../store/studioStore";

export function CategoryFilter() {
    const selectedCategory = useStudioStore((state) => state.selectedCategory);
    const setSelectedCategory = useStudioStore((state) => state.setSelectedCategory);

    const categories = ["All", "Beat", "Drums", "Percussion", "Synth"];

    return (
        <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 border font-mono text-[9px] uppercase tracking-wide transition-all cursor-pointer ${
                        selectedCategory === cat
                            ? "border-wine bg-wine text-white"
                            : "border-ink/10 hover:border-ink/20 text-ink/75"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
