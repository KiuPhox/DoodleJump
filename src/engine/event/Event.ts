export class Event<T> {
    private listeners: ((arg: T) => void)[] = []

    public subscribe(listener: (arg: T) => void): void {
        this.listeners.push(listener)
    }

    public unsubscribe(listener: (arg: T) => void): void {
        const index = this.listeners.indexOf(listener)
        if (index !== -1) {
            this.listeners.splice(index, 1)
        }
    }

    public invoke(arg: T): void {
        for (const listener of this.listeners) {
            listener(arg)
        }
    }
}

