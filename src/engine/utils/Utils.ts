export class Utils {
    static RandomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min
    }

    static RandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}