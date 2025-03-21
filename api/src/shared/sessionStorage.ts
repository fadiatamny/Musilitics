import { AsyncLocalStorage } from 'async_hooks'

type KnownKeys = 'accessToken' | 'token'
type FlexibleKey = KnownKeys | (string & {})

export class SessionStorage {
    private static storage: AsyncLocalStorage<Map<string, any>> =
        new AsyncLocalStorage()

    public static set<T = any>(key: FlexibleKey, value: T): void {
        let store = this.storage.getStore()
        if (!store) {
            store = new Map<string, any>()
            this.storage.enterWith(store)
        }
        store.set(key, value)
    }

    public static get<T = any>(key: FlexibleKey): T | null {
        const store = this.storage.getStore()
        return store?.get(key) ?? null
    }

    public static clear(): void {
        this.storage.enterWith(new Map<string, any>())
    }

    public static dump(): Record<string, any> {
        const store = this.storage.getStore()
        const result: Record<string, any> = {}
        store?.forEach((value: any, key: string) => {
            result[key] = value
        })
        return result
    }

    public static run<Response>(callback: () => Response): Response {
        const store = new Map<string, any>()
        return this.storage.run(store, callback)
    }
}
