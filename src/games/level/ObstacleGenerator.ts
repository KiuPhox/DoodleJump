import { Sprite } from '../../engine/components/sprite/Sprite'
import { Canvas } from '../../engine/system/Canvas'
import { GameObject } from '../../engine/system/GameObject'
import { Utils } from '../../engine/utils/Utils'
import { Vector2 } from '../../engine/utils/Vector2'
import { Level } from '../Level'
import { ScoreManager } from '../ui/ScoreManager'
import { ObjectPoolManager } from './ObjectPoolManager'
import { PlatformGenerator } from './PlatformGenerator'

export class ObstacleGenerator {
    public static obstacles: GameObject[]

    public static init(): void {
        this.obstacles = []
    }

    public static spawnObstacle(): void {
        // Spawn an obstacle
        let obstacle = null

        switch (Utils.WeightPick(Level.getObstacleTypes(ScoreManager.getScore()))) {
            case 0:
                break
            case 1:
                obstacle = ObjectPoolManager.holePool.get()
                break
            case 2:
                obstacle = ObjectPoolManager.monsterPool.get()
                break
            default:
                obstacle = ObjectPoolManager.holePool.get()
        }

        if (obstacle) {
            const sprite = obstacle.getComponent('Sprite') as Sprite

            obstacle.transform.position =
                PlatformGenerator.previousPlatformGenerated.transform.position.add(
                    new Vector2(
                        Utils.RandomFloat(
                            -Canvas.size.x / 2 + sprite.width,
                            Canvas.size.x / 2 - sprite.width
                        ),
                        200
                    )
                )
        }
    }

    public static reset(): void {
        for (const obstacle of this.obstacles) {
            ObjectPoolManager.releaseObstacle(obstacle)
        }
    }

    // Other methods related to obstacle generation
}
