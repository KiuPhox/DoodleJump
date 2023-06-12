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
import { Spring } from "./powerup/Spring"
import { BasePlatform } from "./platforms/BasePlatform"
import { BluePlatform } from "./platforms/BluePlatform"
import { BrownPlatform } from "./platforms/BrownPlatform"
import { Hat } from "./powerup/Hat"
import { Jetpack } from "./powerup/Jetpack"
import { GameState } from "./GameState"
import { GameManager } from "./GameManager"
import { WhitePlatform } from "./platforms/WhitePlatform"

const INITIAL_PLATFORMS_COUNT = 20

export class PlatformGenerator extends GameObject{
    private enviroment: Enviroment
    private player: Player

    private platforms: BasePlatform[]
    private platformSprite: Sprite

    private basePlatformsPools: ObjectPool<BasePlatform>
    private bluePlatformsPools: ObjectPool<BluePlatform>
    public static brownPlatformsPools: ObjectPool<BrownPlatform>
    public static whitePlatformsPools: ObjectPool<WhitePlatform>

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

        PlatformGenerator.whitePlatformsPools= new ObjectPool<WhitePlatform>(
            () => {
                const platform = new WhitePlatform()
                platform.parent = this.enviroment
                this.platforms.push(platform)
                return platform
            },
            (obj) =>{ obj.setActive(true)},
            (obj) => { obj.setActive(false)}
        )

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChange)
    }

    public update(): void {
        super.update()
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i].active && 
                this.platforms[i].transform.position.y - this.platformSprite.height / 2 > Canvas.size.y / 2){

                this.releasePlatform(this.platforms[i])
            }
        }

        const currentScore = Math.floor(this.enviroment.point())
        console.log(currentScore)

        if (this.isInitialGenerated && 
            this.player.transform.position.y - this.maxDistance < 
            this.previousPlatformGenerated.transform.position.y){
                this.spawn(currentScore)
            }

    }

    public spawn(currentScore: number): void{
        let platform = null

        // Choose platform type to spawn

        switch (Utils.WeightPick(Level.getPlaformTypes(currentScore))){
            case 0:
                platform = this.basePlatformsPools.get()
                this.addPowerUp(platform)
                break
            case 1:
                platform = PlatformGenerator.brownPlatformsPools.get()
                this.setPlatformPosition(this.basePlatformsPools.get(), currentScore)
                break
            case 2:
                platform = this.bluePlatformsPools.get()
                this.addPowerUp(platform)
                break
            case 3:
                platform = PlatformGenerator.whitePlatformsPools.get()
                break
            default:
                platform = this.basePlatformsPools.get()
                break
        }

        this.setPlatformPosition(platform, currentScore)
        this.previousPlatformGenerated = platform
    }

    private addPowerUp(platform: BasePlatform){
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
            case 'WhitePlatform':
                PlatformGenerator.whitePlatformsPools.release(platform as WhitePlatform)
                break
        }
    }

    private setPlatformPosition(platform: BasePlatform, currentLevel: number){
        // Set generated platform with a distance from the previously spawned one
        platform.transform.position = new Vector2(
            Utils.RandomFloat(-Canvas.size.x / 2 + 20, Canvas.size.x / 2 - 20),
            this.previousPlatformGenerated.transform.position.y - 
            Utils.RandomFloat(
                Level.getPlatfomSpawnDistances(currentLevel).x,
                Level.getPlatfomSpawnDistances(currentLevel).y
                )
        )
    }

    OnGameStateChange = (gameState: GameState) => {
        switch (gameState){
            case GameState.Ready:
                this.handleReady()
                break
            case GameState.Playing:
                this.handlePlaying()
                break
        }
    }

    private handlePlaying(){
        // Initial Platforms
        const firstPlatform = this.basePlatformsPools.get()
        firstPlatform.transform.position = new Vector2(0, 200)
        this.platformSprite = (firstPlatform.getComponent('Sprite') as Sprite)
        this.previousPlatformGenerated = firstPlatform

        for (let i = 0; i < INITIAL_PLATFORMS_COUNT; i++){
            this.spawn(0)
        }
        // Distance between player and the last platform
        this.maxDistance = this.player.transform.position.y - this.previousPlatformGenerated.transform.position.y
        
        this.isInitialGenerated = true
    }
    
    private handleReady(){
        this.reset()
        const firstPlatform = this.basePlatformsPools.get()
        firstPlatform.transform.position = new Vector2(-80, 200)
        this.platformSprite = (firstPlatform.getComponent('Sprite') as Sprite)
    }

    private reset(){
        for (const platform of this.platforms){
            this.releasePlatform(platform)
        }
    }
}