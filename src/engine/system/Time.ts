export class Time {
    private static startTime: number
    public static lastFrameTime: number

    public static init() {
        Time.startTime = window.performance.now()
        Time.lastFrameTime = 0
    }

    static get time(): number {
        return (window.performance.now() - Time.startTime) / 1000
    }

    static get deltaTime(): number {
        return (window.performance.now() - Time.lastFrameTime) / 1000
    }
}
