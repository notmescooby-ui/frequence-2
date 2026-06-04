import { useStudioStore } from "../../store/studioStore";

export function SceneSelector() {
    const scenes = useStudioStore((state) => state.scenes);
    const activeSceneId = useStudioStore((state) => state.activeSceneId);
    const setActiveScene = useStudioStore((state) => state.setActiveScene);
    const addScene = useStudioStore((state) => state.addScene);
    const removeScene = useStudioStore((state) => state.removeScene);

    return (
        <div className="flex items-center justify-between border-t border-white/5 bg-black/40 px-6 py-3 select-none z-20">
            <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40 mr-2">
                    Arrangement Scenes
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                    {scenes.map((scene) => {
                        const isActive = scene.id === activeSceneId;
                        return (
                            <div
                                key={scene.id}
                                className={`flex items-center gap-2 border font-mono text-[10px] uppercase tracking-wider px-4 py-1.5 transition-all cursor-pointer ${
                                    isActive
                                        ? "border-wine bg-wine text-white"
                                        : "border-white/10 text-white/60 hover:border-white/20 hover:text-white"
                                }`}
                                onClick={() => setActiveScene(scene.id)}
                            >
                                <span>{scene.name}</span>
                                {scenes.length > 1 && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeScene(scene.id);
                                        }}
                                        className="hover:text-red-400 font-bold ml-1 text-[11px] leading-none focus:outline-none cursor-pointer"
                                        title="Delete Scene"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={addScene}
                    className="border border-white/10 hover:border-wine hover:text-wine px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                    title="Add New Scene"
                >
                    + Add Scene
                </button>
            </div>
            
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Scene Mode (Loops 16s Grid)
            </div>
        </div>
    );
}
