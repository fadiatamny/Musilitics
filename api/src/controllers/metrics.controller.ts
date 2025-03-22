import { Controller, Route, Get, OperationId, Middlewares } from 'tsoa'
import { buildAuthMiddleware } from '../middlewares'
import { SpotifyService } from '../services'
import { APISpotifyDetails } from '../models'

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
}
