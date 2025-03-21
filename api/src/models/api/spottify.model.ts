import { SpotifyProfile } from "../spotify";

export interface APISpotifyDetails {
    profile: SpotifyProfile;
    tracks: any[];
    genres: string[];
    artists: any[];
}
