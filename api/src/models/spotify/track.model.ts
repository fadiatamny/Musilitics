export interface SpotifyTrack {
  rank: number;
  name: string;
  link: string;
  popularity: number;
  album: {
    name: string;
    link: string;
    image: string;
  },
  artist: {
    name: string;
    link: string;
  }
}
