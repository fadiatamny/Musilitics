import { SpotifyArtist, SpotifyGenre, SpotifyProfile, SpotifyTrack } from "../spotify";

export interface APISpotifyDetails {
    profile: SpotifyProfile;
    tracks: SpotifyTrack[];
    genres: SpotifyGenre[];
    artists: SpotifyArtist[];
}
