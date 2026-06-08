import { getSpotifyToken } from "./spotify";

export async function getAllPlaylists() {
  try {
    const token = await getSpotifyToken();

    if (!token) {
      console.warn("No Spotify token found in session");
      return [];
    }

    let url = "https://api.spotify.com/v1/me/playlists?limit=50";
    const playlists: any[] = [];

    while (url) {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Spotify API error: ${response.status} ${response.statusText}`);
        break;
      }

      const data = await response.json();
      if (data && data.items) {
        playlists.push(...data.items);
      }
      url = data.next;
    }

    return playlists;
  } catch (error) {
    console.error("Failed to fetch Spotify playlists:", error);
    return [];
  }
}

export async function getPlaylistTracks(playlistId: string) {
  try {
    const token = await getSpotifyToken();

    if (!token) {
      throw new Error("No Spotify token found in session");
    }

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch tracks for playlist ${playlistId}:`, error);
    return { items: [] };
  }
}

export async function getSpotifyProfile() {
  try {
    const token = await getSpotifyToken();
    if (!token) return null;

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error("Failed to fetch Spotify profile:", error);
  }
  return null;
}
