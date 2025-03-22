export interface YoutubeTrack {
    rank: number
    name: string
    link: string
    image: string | null
    artist: {
        name: string
        image: string | null
        link: string
    }
}
