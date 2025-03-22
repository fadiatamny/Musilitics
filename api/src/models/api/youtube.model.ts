import { YoutubeArtist, YoutubeGenre, YoutubeProfile, YoutubeTrack } from "../youtube";

export interface APIYoutubeDetails {
    profile: YoutubeProfile;
    tracks: YoutubeTrack[];
    genres: YoutubeGenre[];
    artists: YoutubeArtist[];
}
