import { Sprite } from "../../engine/components/Sprite"
import { Canvas } from "../../engine/system/Canvas"
import { Utils } from "../../engine/utils/Utils"
import { Vector2 } from "../../engine/utils/Vector2"
import { Enviroment } from "../Enviroment"
import { Level } from "../Level"
import { Player } from "../Player"
import { BasePlatform } from "../platforms/BasePlatform"
import { Hat } from "../powerup/Hat"
import { Jetpack } from "../powerup/Jetpack"
import { Spring } from "../powerup/Spring"
import { ScoreManager } from "../ui/ScoreManager"
import { ObjectPoolManager } from "./ObjectPoolManager"
import { ObstacleGenerator } from "./ObstacleGenerator"

const INITIAL_PLATFORMS_COUNT = 20

export class PlatformGenerator {
    public static platforms: BasePlatform[]
    public static previousPlatformGenerated: BasePlatform

    private static platformSprite: Sprite
    private static maxDistance: number
    private static isInitialGenerated: boolean

    private static player: Player

    private static enviroment: Enviroment
    // Other properties and methods related to platform generation

    public static init(player: Player, enviroment: Enviroment): void {
        this.isInitialGenerated = false
        this.player = player
        this.enviroment = enviroment
        this.platforms = []
    }

    public static update(): void {
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i].active && 
                this.platforms[i].transform.position.y + this.platformSprite.height / 2 < -Canvas.size.y / 2){

                ObjectPoolManager.releasePlatform(this.platforms[i])
            }
        }
        // Update platform generation logic
        if (this.isInitialGenerated && 
            this.player.transform.position.y + this.maxDistance >
            this.previousPlatformGenerated.transform.position.y){
                this.spawnPlatform()

                if (Utils.RandomPercent(10)){
                    ObstacleGenerator.spawnObstacle()
                }
        }
    }

    public static spawnPlatform(): void {
        // Spawn a platform
        let platform = null

        // Choose platform type to spawn
        switch (Utils.WeightPick(Level.getPlaformTypes(ScoreManager.getScore()))){
            case 0:
                platform = ObjectPoolManager.basePlatformsPool.get()
                this.addPowerUp(platform)
                break
            case 1:
                platform = ObjectPoolManager.brownPlatformsPool.get()
                this.setPlatformPosition(ObjectPoolManager.basePlatformsPool.get(), ScoreManager.getScore())
                break
            case 2:
                platform = ObjectPoolManager.bluePlatformsPool.get()
                this.addPowerUp(platform)
                break
            case 3:
                platform = ObjectPoolManager.whitePlatformsPool.get()
                break
            default:
                platform = ObjectPoolManager.basePlatformsPool.get()
                break
        }

        this.setPlatformPosition(platform, ScoreManager.getScore())
        this.previousPlatformGenerated = platform
    }

    private static setPlatformPosition(platform: BasePlatform, currentLevel: number): void {
        // Set the position of the platform
        platform.transform.position = new Vector2(
            Utils.RandomFloat(-Canvas.size.x / 2 + 20, Canvas.size.x / 2 - 20),
            this.previousPlatformGenerated.transform.position.y +
            Utils.RandomFloat(
                Level.getPlatfomSpawnDistances(currentLevel).x,
                Level.getPlatfomSpawnDistances(currentLevel).y
            )
        )
    }

    public static readySpawn(){
        this.reset()
        const firstPlatform = ObjectPoolManager.basePlatformsPool.get()
        firstPlatform.transform.position = new Vector2(-80, -200)
        this.platformSprite = (firstPlatform.getComponent('Sprite') as Sprite)
    }

    public static playingStateSpawn(): void{
        this.reset()
        this.enviroment.transform.position = Vector2.zero

        // Initial Platforms
        const firstPlatform = ObjectPoolManager.basePlatformsPool.get()
        firstPlatform.transform.position = new Vector2(0, -200)
        this.platformSprite = (firstPlatform.getComponent('Sprite') as Sprite)
        this.previousPlatformGenerated = firstPlatform

        for (let i = 0; i < INITIAL_PLATFORMS_COUNT; i++){
            this.spawnPlatform()
        }
        // Distance between player and the last platform
        this.maxDistance = this.previousPlatformGenerated.transform.position.y - this.player.transform.position.y
        
        this.isInitialGenerated = true
    }

    public static reset(){
        for (const platform of this.platforms){
            ObjectPoolManager.releasePlatform(platform)
        }
    }

    public static addPowerUp(platform: BasePlatform){
        if (this.platforms.length > INITIAL_PLATFORMS_COUNT)
        if (Utils.RandomPercent(10)){
            switch (Utils.WeightPick(Level.powerUpSpawnChances)){
                case 0:
                    platform.addPowerUp(new Spring())
                    break
                case 1:
                    platform.addPowerUp(new Hat())
                    break
                case 2:
                    platform.addPowerUp(new Jetpack())
                    break
            }
        }
    }
}