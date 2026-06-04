import * as Tone from "tone";
import { Clip } from "../../types/studio";

class ToneEngine {
    private players: Map<string, Tone.GrainPlayer> = new Map();

    public syncTracks(clips: Clip[], projectBpm: number, isPlaying: boolean) {
        const currentClipIds = new Set(clips.map((c) => c.id));

        // 1. Dispose deleted players
        this.players.forEach((player, clipId) => {
            if (!currentClipIds.has(clipId)) {
                player.stop();
                player.dispose();
                this.players.delete(clipId);
            }
        });

        // 2. Add or update players
        clips.forEach((clip) => {
            let player = this.players.get(clip.id);
            if (!player) {
                player = new Tone.GrainPlayer(clip.file, () => {
                    console.log(`Audio loaded for clip: ${clip.title}`);
                    // If transport is started, start the player synced immediately
                    if (isPlaying && Tone.Transport.state === "started") {
                        try {
                            player?.start(Tone.Transport.seconds);
                        } catch (err) {
                            console.error("Failed to start player on load:", err);
                        }
                    }
                });
                player.loop = true;
                player.toDestination();
                this.players.set(clip.id, player);
            }

            // Sync audio parameters (safely check node existence)
            if (player) {
                player.detune = clip.pitch * 100;
                player.volume.value = Tone.gainToDb(clip.volume / 100);
                player.playbackRate = projectBpm / clip.bpm;

                // Sync Transport scheduling
                const scheduledOffset = (player as any)._scheduledOffset;
                if (scheduledOffset !== clip.startOffset) {
                    player.unsync();
                    player.sync().start(clip.startOffset || 0);
                    (player as any)._scheduledOffset = clip.startOffset;
                }
            }
        });
    }

    public async startTransport() {
        await Tone.start();
        Tone.Transport.loop = true;
        Tone.Transport.loopStart = 0;
        Tone.Transport.loopEnd = 16;
        Tone.Transport.start();
    }

    public stopTransport() {
        Tone.Transport.stop();
    }

    public setBpm(bpm: number) {
        Tone.Transport.bpm.value = bpm;
    }

    public getSeconds(): number {
        return Tone.Transport.seconds;
    }

    public getTransportState() {
        return Tone.Transport.state;
    }

    public disposeAll() {
        this.players.forEach((player) => {
            try {
                player.stop();
                player.dispose();
            } catch (err) {
                console.error("Error disposing player:", err);
            }
        });
        this.players.clear();
        try {
            Tone.Transport.stop();
        } catch (err) {
            console.error("Error stopping transport:", err);
        }
    }
}

export const toneEngine = new ToneEngine();
