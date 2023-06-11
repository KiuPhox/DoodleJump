import { Sprite } from "../engine/components/Sprite"
import { Canvas } from "../engine/system/Canvas"
import { GameObject } from "../engine/system/GameObject"
import { ObjectPool } from "../engine/utils/ObjectPool"
import { Utils } from "../engine/utils/Utils"
import { Vector2 } from "../engine/utils/Vector2"
import { Game } from "../game"
import { Enviroment } from "./Enviroment"
import { Level } from "./Level"
import { Player } from "./Player"
import { BasePlatform } from "./platforms/BasePlatform"
import { BluePlatform } from "./platforms/BluePlatform"
import { BrownPlatform } from "./platforms/BrownPlatform"

export class PlatformGenerator extends GameObject{
    private enviroment: Enviroment
    private player: Player

    private platforms: BasePlatform[]
    private platformSprite: Sprite

    private basePlatformsPools: ObjectPool<BasePlatform>
    private bluePlatformsPools: ObjectPool<BluePlatform>
    public static brownPlatformsPools: ObjectPool<BrownPlatform>

    private previousPlatformGenerated: BasePlatform
    private maxDistance: number
    private isInitialGenerated: boolean

    constructor() {
        super('PlatformGenerator')

        this.isInitialGenerated = false

        this.platforms = []
        this.enviroment = Game.Find('Enviroment') as Enviroment
        this.player = Game.Find('Player') as Player

        // Define platform pool
        this.basePlatformsPools = new ObjectPool<BasePlatform>(
            () => {
                const platform = new BasePlatform()
                platform.parent = this.enviroment
                this.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        this.bluePlatformsPools = new ObjectPool<BluePlatform>(
            () => {
                const platform = new BluePlatform()
                platform.parent = this.enviroment
                this.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        PlatformGenerator.brownPlatformsPools= new ObjectPool<BrownPlatform>(
            () => {
                const platform = new BrownPlatform()
                platform.parent = this.enviroment
                this.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        // Initial Platforms
        const firstPlatform = this.basePlatformsPools.get()
        firstPlatform.transform.position = new Vector2(0, 200)
        this.platformSprite = (firstPlatform.getComponent('Sprite') as Sprite)
        this.previousPlatformGenerated = firstPlatform

        for (let i = 0; i < 20; i++){
            this.spawn(0)
        }
        // Distance between player and the last platform
        this.maxDistance = this.player.transform.position.y - this.previousPlatformGenerated.transform.position.y
        
        this.isInitialGenerated = true
    }

    public update(): void {
        super.update()

        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i].active && 
                this.platforms[i].transform.position.y - this.platformSprite.height / 2 > Canvas.size.y / 2){
                this.releasePlatform(this.platforms[i])
            }
        }

        let currentLevel = Math.floor(this.enviroment.point() / 1000)
        if (currentLevel > Level.scoreToPlatfomSpawnDistances.length - 1){
            currentLevel = Level.scoreToPlatfomSpawnDistances.length - 1
        }

        if (this.isInitialGenerated && 
            this.player.transform.position.y - this.maxDistance < 
            this.previousPlatformGenerated.transform.position.y){
                this.spawn(currentLevel)
            }

    }

    public spawn(currentLevel: number): void{
        let platform = null

        // Choose platform type to spawn
        let typeLevel = currentLevel
        if (typeLevel > Level.scoreToPlatformTypeSpawn.length - 1)
            typeLevel = Level.scoreToPlatformTypeSpawn.length - 1

        switch (Utils.WeightPick(Level.scoreToPlatformTypeSpawn[typeLevel])){
            case 0:
                platform = this.basePlatformsPools.get()
                break
            case 1:
                platform = PlatformGenerator.brownPlatformsPools.get()
                this.setPlatformPosition(this.basePlatformsPools.get(), currentLevel)
                break
            case 2:
                platform = this.bluePlatformsPools.get()
                break
            default:
                platform = this.basePlatformsPools.get()
                break
        }

        // Set generated platform with a distance from the previously spawned one
        this.setPlatformPosition(platform, currentLevel)
        this.previousPlatformGenerated = platform
    }

    private releasePlatform(platform: BasePlatform){
        switch (platform.name){
            case 'BasePlatform':
                this.basePlatformsPools.release(platform)
                break
            case 'BluePlatform':
                this.bluePlatformsPools.release(platform as BluePlatform)
                break
            case 'BrownPlatform':
                PlatformGenerator.brownPlatformsPools.release(platform as BrownPlatform)
                break
        }
    }

    private setPlatformPosition(platform: BasePlatform, currentLevel: number){
        platform.transform.position = new Vector2(
            Utils.RandomFloat(-Canvas.size.x / 2, Canvas.size.x / 2),
            this.previousPlatformGenerated.transform.position.y - 
            Utils.RandomFloat(
                Level.scoreToPlatfomSpawnDistances[currentLevel].x, 
                Level.scoreToPlatfomSpawnDistances[currentLevel].y
                )
        )
    }
}