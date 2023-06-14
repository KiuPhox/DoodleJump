import { Event } from "../engine/event/Event"
import { Layer } from "../engine/system/Layer"
import { Physic } from "../engine/system/Physic"
import { GameState } from "./GameState"
import Background from "./Background"
import { Player } from "./Player"
import { Enviroment } from "./Enviroment"
import { TopBar } from "./ui/TopBar"
import { LevelGenerator } from "./level/LevelGenerator"
import { BlackImage } from "./ui/BlackImage"
import { MainMenu } from "./ui/MainMenu"
import { SoundManager } from "./SoundManager"
import { ScoreManager } from "./ui/ScoreManager"
import { GameOverCanvas } from "./ui/GameOverCanvas"

export class GameManager {
    private static gameState: GameState

    public static OnGameStateChanged: Event<GameState>

    private static blackImage: BlackImage

    public static init(){
        // Physic setup
        Layer.add('Background')
        Physic.setInteractiveLayer('Background', 'Background', false)

        this.OnGameStateChanged = new Event<GameState>()

        const player = new Player()    
        new Background()
        new TopBar()

        new Enviroment(player)

        new LevelGenerator()

        new MainMenu()

        new GameOverCanvas()

        this.blackImage = new BlackImage()

        new ScoreManager()
        
        this.updateGameState(GameState.Ready)
    }

    public static updateGameState(gameState: GameState): void {
        this.gameState = gameState

        switch (this.gameState) {
            case GameState.Ready:
                break
            case GameState.Playing:
                break
            case GameState.GameOver:
                SoundManager.playGameOverSound()
                break
        }

        this.OnGameStateChanged.invoke(this.gameState)
    }

    public static getGameState(): GameState {
        return this.gameState
    }
}