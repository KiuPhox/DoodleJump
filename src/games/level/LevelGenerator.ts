import { GameObject } from '../../engine/system/GameObject'
import { Game } from '../../game'
import { Enviroment } from '../Enviroment'
import { Player } from '../player/Player'
import { GameManager } from '../GameManager'
import { PlatformGenerator } from './PlatformGenerator'
import { ObstacleGenerator } from './ObstacleGenerator'
import { ObjectPoolManager } from './ObjectPoolManager'
import { GameState } from '../GameState'

export class LevelGenerator extends GameObject {
    constructor() {
        super('PlatformGenerator')

        const enviroment = Game.Find('Enviroment') as Enviroment
        const player = Game.Find('Player') as Player

        ObjectPoolManager.init(enviroment)
        PlatformGenerator.init(player, enviroment)
        ObstacleGenerator.init()

        GameManager.OnGameStateChanged.subscribe(this.OnGameStateChange)
    }

    public update(): void {
        super.update()
        PlatformGenerator.update()
    }

    OnGameStateChange = (gameState: GameState) => {
        switch (gameState) {
            case GameState.READY:
                this.handleReady()
                break
            case GameState.PLAYING:
                this.handlePlaying()
                break
        }
    }

    private handlePlaying(): void {
        PlatformGenerator.playingStateSpawn()
    }

    private handleReady(): void {
        PlatformGenerator.readySpawn()
        ObstacleGenerator.reset()
    }
}
