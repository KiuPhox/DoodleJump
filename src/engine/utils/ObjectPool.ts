export class ObjectPool<T> {
    private pool: T[]
    private createObject: () => T
    private getObject: (obj: T) => void
    private resetObject: (obj: T) => void


    constructor(createObject: () => T, getObject:(obj: T) => void, resetObject: (obj: T) => void) {
        this.pool = []
        this.createObject = createObject
        this.getObject = getObject
        this.resetObject = resetObject
    }

    public get(): T {
        if (this.pool.length > 0) {
            const p = this.pool.pop() as T
            this.getObject(p)
            return p
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