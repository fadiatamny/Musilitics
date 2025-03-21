export function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift()
    }
    return undefined
}

export function cookieExists(name: string): boolean {
    return !!getCookie(name)
}

export function deleteCookie(name: string, path = '/', domain?: string): void {
    if (cookieExists(name)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};${domain ? ` domain=${domain};` : ''}`
    }
}
