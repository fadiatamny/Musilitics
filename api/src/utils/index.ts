export * from './requiredEnv'
export * from './serialize'

export function jsonToQueryParams(
    json: Record<string, string | number | boolean>
) {
    return Object.keys(json)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        )
        .join('&')
}
