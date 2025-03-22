import { Controller, Route, Get, OperationId, Middlewares } from 'tsoa'
import { buildAuthMiddleware } from '../middlewares'
import { SpotifyService, YoutubeService } from '../services'
import { APISpotifyDetails, APIYoutubeDetails } from '../models'

@Route('/metrics')
export class MetricsController extends Controller {
    @Get('/spotify')
    @OperationId('Get Spotify Analytical Data')
    @Middlewares(buildAuthMiddleware('spotify'))
    public async spotifyDetails(): Promise<APISpotifyDetails> {
        const [profile, tracks, genres, artists] = await Promise.all([
            await SpotifyService.fetchProfile(),
            await SpotifyService.fetchTopTracks(),
            await SpotifyService.fetchTopGenres(),
            await SpotifyService.fetchTopArtists()
        ])

        return {
            profile: profile,
            tracks: tracks,
            genres: genres,
            artists: artists
        }
    }

    @Get('/youtube')
    @OperationId('Get Youtube music Analytical Data')
    @Middlewares(buildAuthMiddleware('youtube'))
    public async youtubeDetails(): Promise<APIYoutubeDetails> {
        const [profile, tracks, genres, artists] = await Promise.all([
            await YoutubeService.fetchProfile(),
            await YoutubeService.fetchTopTracks(),
            await YoutubeService.fetchTopGenres(),
            await YoutubeService.fetchTopArtists()
        ])

        return {
            profile: profile,
            tracks: tracks,
            genres: genres,
            artists: artists
        }
    }
}
