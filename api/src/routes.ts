/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MetricsController } from './controllers/metrics.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HelloController } from './controllers/hello.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CallbacksController } from './controllers/callbacks.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './controllers/auth.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "SpotifyProfile": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "image": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SpotifyTrack": {
        "dataType": "refObject",
        "properties": {
            "rank": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "link": {"dataType":"string","required":true},
            "popularity": {"dataType":"double","required":true},
            "album": {"dataType":"nestedObjectLiteral","nestedProperties":{"image":{"dataType":"string","required":true},"link":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"required":true},
            "artist": {"dataType":"nestedObjectLiteral","nestedProperties":{"link":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SpotifyGenre": {
        "dataType": "refObject",
        "properties": {
            "genre": {"dataType":"string","required":true},
            "rank": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SpotifyArtist": {
        "dataType": "refObject",
        "properties": {
            "rank": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
            "link": {"dataType":"string","required":true},
            "popularity": {"dataType":"double","required":true},
            "image": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "APISpotifyDetails": {
        "dataType": "refObject",
        "properties": {
            "profile": {"ref":"SpotifyProfile","required":true},
            "tracks": {"dataType":"array","array":{"dataType":"refObject","ref":"SpotifyTrack"},"required":true},
            "genres": {"dataType":"array","array":{"dataType":"refObject","ref":"SpotifyGenre"},"required":true},
            "artists": {"dataType":"array","array":{"dataType":"refObject","ref":"SpotifyArtist"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsMetricsController_spotifyDetails: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/metrics/spotify',
            ...(fetchMiddlewares<RequestHandler>(MetricsController)),
            ...(fetchMiddlewares<RequestHandler>(MetricsController.prototype.spotifyDetails)),

            async function MetricsController_spotifyDetails(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMetricsController_spotifyDetails, request, response });

                const controller = new MetricsController();

              await templateService.apiHandler({
                methodName: 'spotifyDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsHelloController_hello: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/api/hello',
            ...(fetchMiddlewares<RequestHandler>(HelloController)),
            ...(fetchMiddlewares<RequestHandler>(HelloController.prototype.hello)),

            async function HelloController_hello(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsHelloController_hello, request, response });

                const controller = new HelloController();

              await templateService.apiHandler({
                methodName: 'hello',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCallbacksController_callbackSpotify: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/callbacks/spotify',
            ...(fetchMiddlewares<RequestHandler>(CallbacksController)),
            ...(fetchMiddlewares<RequestHandler>(CallbacksController.prototype.callbackSpotify)),

            async function CallbacksController_callbackSpotify(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCallbacksController_callbackSpotify, request, response });

                const controller = new CallbacksController();

              await templateService.apiHandler({
                methodName: 'callbackSpotify',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_refreshAccessToken: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.post('/api/auth/spotify/refresh',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.refreshAccessToken)),

            async function AuthController_refreshAccessToken(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_refreshAccessToken, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'refreshAccessToken',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthController_authSpotify: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/auth/spotify',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.authSpotify)),

            async function AuthController_authSpotify(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_authSpotify, request, response });

                const controller = new AuthController();

              await templateService.apiHandler({
                methodName: 'authSpotify',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
