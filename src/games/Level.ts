import { Vector2 } from "../engine/utils/Vector2"

export class Level {

    // Objects: Springs, Hat, Jetpacks
    public static powerUpSpawnChances: number[] = [85, 10, 5]

    public static scoreToPlatfomSpawnDistances: Vector2[] = [
        new Vector2(20, 50),
        new Vector2(20, 55),
        new Vector2(20, 60),
        new Vector2(20, 70),
        new Vector2(20, 80),
        new Vector2(20, 90),
        new Vector2(30, 100),
        new Vector2(30, 105),
        new Vector2(30, 110),
        new Vector2(40, 115),
        new Vector2(40, 120),
        new Vector2(40, 120)
    ]

    // Platforms: BasePlatform, BrownPlatform, BluePlatform, WhitePlatform
    public static scoreToPlatformTypeSpawn: number[][] = [
        [90, 10, 0, 0], // 0m
        [85, 10, 5, 0], // 1000m
        [50, 10, 40, 10],
        [50, 10, 10, 30]
    ]
}