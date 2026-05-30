const songs = [
    { artist: "harry styles", track: "sunflower vol 6", key: "Harry Styles" },
    { artist: "taylor swift", track: "look what you made me do", key: "Taylor Swift" },
    { artist: "bad bunny", track: "dtmf", key: "Bad Bunny" },
    { artist: "one direction", track: "ready to run", key: "One Direction" },
    { artist: "arctic monkeys", track: "do i wanna know", key: "Arctic Monkeys" },
    { artist: "billie eilish", track: "happier than ever", key: "Billie Eilish" },
    { artist: "the weeknd", track: "the hills", key: "The Weeknd" },
    { artist: "ariana grande", track: "bloodline", key: "Ariana Grande" },
];

for (const s of songs) {
    const q = encodeURIComponent(`${s.artist} ${s.track}`);
    const res = await fetch(`https://itunes.apple.com/search?term=${q}&entity=song&limit=1`);
    const data = await res.json();
    const preview = data.results?.[0]?.previewUrl ?? "null";
    console.log(`${s.key}: "${preview}"`);
}
