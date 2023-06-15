import { GameObject } from "../../engine/system/GameObject"
import { ObjectPool } from "../../engine/utils/ObjectPool"
import { Enviroment } from "../Enviroment"
import { Hole } from "../obstacles/Hole"
import { Monster } from "../obstacles/Monster"
import { BasePlatform } from "../platforms/BasePlatform"
import { BluePlatform } from "../platforms/BluePlatform"
import { BrownPlatform } from "../platforms/BrownPlatform"
import { WhitePlatform } from "../platforms/WhitePlatform"
import { ObstacleGenerator } from "./ObstacleGenerator"
import { PlatformGenerator } from "./PlatformGenerator"

export class ObjectPoolManager {
    public static basePlatformsPool: ObjectPool<BasePlatform>
    public static bluePlatformsPool: ObjectPool<BluePlatform>
    public static brownPlatformsPool: ObjectPool<BrownPlatform>
    public static whitePlatformsPool: ObjectPool<WhitePlatform>
    public static holePool: ObjectPool<Hole>
    public static monsterPool: ObjectPool<Monster>

    public static init(enviroment: Enviroment){
        this.basePlatformsPool = new ObjectPool<BasePlatform>(
            () => {
                const platform = new BasePlatform()
                platform.setParent(enviroment)
                PlatformGenerator.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        this.bluePlatformsPool = new ObjectPool<BluePlatform>(
            () => {
                const platform = new BluePlatform()
                platform.setParent(enviroment)
                PlatformGenerator.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        this.brownPlatformsPool= new ObjectPool<BrownPlatform>(
            () => {
                const platform = new BrownPlatform()
                platform.setParent(enviroment)
                PlatformGenerator.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        this.whitePlatformsPool= new ObjectPool<WhitePlatform>(
            () => {
                const platform = new WhitePlatform()
                platform.setParent(enviroment)
                PlatformGenerator.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        this.holePool= new ObjectPool<Hole>(
            () => {
                const hole = new Hole()
                hole.setParent(enviroment)
                ObstacleGenerator.obstacles.push(hole)
                return hole
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        this.monsterPool= new ObjectPool<Monster>(
            () => {
                const monster = new Monster()
                monster.setParent(enviroment)
                ObstacleGenerator.obstacles.push(monster)
                return monster
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )
    }

    public static releasePlatform(platform: BasePlatform): void {
        // Release the platform based on object's name
        switch (platform.name){
            case 'BasePlatform':
                this.basePlatformsPool.release(platform)
                break
            case 'BluePlatform':
                this.bluePlatformsPool.release(platform as BluePlatform)
                break
            case 'BrownPlatform':
                this.brownPlatformsPool.release(platform as BrownPlatform)
                break
            case 'WhitePlatform':
                this.whitePlatformsPool.release(platform as WhitePlatform)
                break
        }
    }

    public static releaseObstacle(obstacle: GameObject): void {
        // Release the obstacle
        switch (obstacle.name){
            case 'Hole':
                this.holePool.release(obstacle as Hole)
                break
            case 'Monster':
                this.monsterPool.release(obstacle as Monster)
                break
        }
    }
}