import { AsyncLocalStorage } from 'async_hooks'

export class SessionStorage {
    private static storage: AsyncLocalStorage<Map<string, any>> =
        new AsyncLocalStorage()

    public static async set<T = any>(key: string, value: T): Promise<void> {
        let store = this.storage.getStore()
        if (!store) {
            store = new Map<string, any>()
            this.storage.enterWith(store)
        }
        store.set(key, value)
    }

    public static async get<T = any>(key: string): Promise<T | null> {
        const store = this.storage.getStore()
        return store?.get(key) ?? null
    }

    public static async clear(): Promise<void> {
        this.storage.enterWith(new Map<string, any>())
    }

    public static async dump(): Promise<Record<string, any>> {
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
