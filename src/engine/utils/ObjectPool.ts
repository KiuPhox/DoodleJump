export class ObjectPool<T> {
    private pool: T[]
    private createObject: () => T
    private resetObject: (obj: T) => void

    constructor(createObject: () => T, resetObject: (obj: T) => void) {
        this.pool = []
        this.createObject = createObject
        this.resetObject = resetObject
    }

    public get(): T {
        if (this.pool.length > 0) {
            return this.pool.pop() as T
        } else {
            return this.createObject()
        }
    }

    public release(obj: T): void {
        this.resetObject(obj)
        this.pool.push(obj)
    }

    public clear(): void {
        this.pool.length = 0
    }
}