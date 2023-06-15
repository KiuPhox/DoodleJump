import { Vector2 } from '../engine/utils/Vector2'

export class Level {
    // Objects: Springs, Hat, Jetpacks
    public static powerUpSpawnChances: number[] = [85, 10, 5]

    // Obstacle: None, Hole, Monster
    public static obstacleSpawnChances: { [key: number]: number[] } = {
        8000: [100, 0, 0],
        10000: [55, 5, 35],
        15000: [50, 10, 40],
    }

    private static scoreToPlatfomSpawnDistances: { [key: number]: Vector2 } = {
        1000: new Vector2(20, 50),
        3000: new Vector2(20, 55),
        6000: new Vector2(20, 60),
        8000: new Vector2(20, 70),
        10000: new Vector2(20, 80),
        15000: new Vector2(30, 90),
        20000: new Vector2(30, 100),
    }

    // Platforms: BasePlatform, BrownPlatform, BluePlatform, WhitePlatform
    private static scoreToPlatformTypeSpawn: { [key: number]: number[] } = {
        1000: [90, 10, 0, 0],
        4000: [85, 10, 5, 0],
        8000: [60, 10, 40, 0],
        12000: [30, 10, 70, 0],
        20000: [50, 10, 10, 30],
    }

    public static getPlaformTypes(score: number): number[] {
        for (const key in this.scoreToPlatformTypeSpawn) {
            if (score < parseFloat(key)) {
                return this.scoreToPlatformTypeSpawn[key]
            }
        }
        const keys = Object.keys(this.scoreToPlatformTypeSpawn)
        const lastKey = keys[keys.length - 1]
        return this.scoreToPlatformTypeSpawn[parseFloat(lastKey)]
    }

    public static getObstacleTypes(score: number): number[] {
        for (const key in this.obstacleSpawnChances) {
            if (score < parseFloat(key)) {
                return this.obstacleSpawnChances[key]
            }
        }

        const keys = Object.keys(this.obstacleSpawnChances)
        const lastKey = keys[keys.length - 1]
        return this.obstacleSpawnChances[parseFloat(lastKey)]
    }

    public static getPlatfomSpawnDistances(score: number): Vector2 {
        for (const key in this.scoreToPlatfomSpawnDistances) {
            if (score < parseFloat(key)) {
                return this.scoreToPlatfomSpawnDistances[key]
            }
        }
        const keys = Object.keys(this.scoreToPlatfomSpawnDistances)
        const lastKey = keys[keys.length - 1]
        return this.scoreToPlatfomSpawnDistances[parseFloat(lastKey)]
    }
}
