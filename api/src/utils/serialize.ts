export function serialize(
    obj: unknown,
    replacer?: (
        key: string,
        value: unknown
    ) => unknown | (string | number)[] | null,
    space?: string | number
): string {
    const seen = new WeakSet()

    return JSON.stringify(
        obj,
        (key, value) => {
            if (typeof replacer === 'function') {
                value = replacer(key, value)
            }

            if (value !== null && typeof value === 'object') {
                if (seen.has(value)) {
                    return '[Circular]'
                }
                seen.add(value)
            }

            return value
        },
        space
    )
}
