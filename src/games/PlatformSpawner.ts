import { Sprite } from "../engine/components/Sprite"
import { Canvas } from "../engine/system/Canvas"
import { GameObject } from "../engine/system/GameObject"
import { ObjectPool } from "../engine/utils/ObjectPool"
import { Utils } from "../engine/utils/Utils"
import { Vector2 } from "../engine/utils/Vector2"
import { Game } from "../game"
import { Enviroment } from "./Enviroment"
import { Player } from "./Player"
import { BasePlatform } from "./platforms/BasePlatform"

const SPAWN_DISTANCE_RANGE = new Vector2(20, 50)

export class PlatformManager extends GameObject{
    private enviroment: Enviroment
    private player: Player

    private platforms: BasePlatform[]
    private platformsPools: ObjectPool<BasePlatform>
    private platformSprite: Sprite

    private previousPlatformSpawned: BasePlatform

    constructor() {
        super('PlatformSpawner')

        this.platforms = []
        this.enviroment = Game.Find('Enviroment') as Enviroment
        this.player = Game.Find('Player') as Player

        // Define platform pool
        this.platformsPools = new ObjectPool<BasePlatform>(
            () => {
                const platform = new BasePlatform()
                platform.parent = this.enviroment
                this.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true) },
            (obj) => { obj.setActive(false) }
        )

        // Initial Platforms
        const firstPlatform = this.platformsPools.get()
        firstPlatform.transform.position = new Vector2(0, 200)
        this.platformSprite = (firstPlatform.getComponent('Sprite') as Sprite)
        this.previousPlatformSpawned = firstPlatform

        for (let i = 0; i < 200; i++){
            this.spawn()
        }
    }

    public spawn(): void{
        const platform = this.platformsPools.get()

        // Spawn a platform with a distance from the previously spawned one
        platform.transform.position = new Vector2(
            Utils.RandomFloat(-Canvas.size.x / 2, Canvas.size.x / 2),
            this.previousPlatformSpawned.transform.position.y - Utils.RandomFloat(SPAWN_DISTANCE_RANGE.x, SPAWN_DISTANCE_RANGE.y)
        )

        this.previousPlatformSpawned = platform
    }

    public update(): void {
        super.update()
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i].active && 
                this.platforms[i].transform.position.y - this.platformSprite.height / 2 > Canvas.size.y / 2){
                this.platformsPools.release(this.platforms[i])
            }
        }
    }
}