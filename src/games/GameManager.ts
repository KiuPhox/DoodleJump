import { Event } from '../engine/event/Event'
import { GameState } from './GameState'
import { SceneManager } from '../engine/system/scene/SceneManager'
import { SoundManager } from './SoundManager'

export class GameManager {
    private static gameState: GameState

    public static OnGameStateChanged: Event<GameState>

    public static init() {
        this.OnGameStateChanged = new Event<GameState>()
    }

    public static updateGameState(gameState: GameState): void {
        this.gameState = gameState

        switch (this.gameState) {
            case GameState.Ready:
                this.handleReadyState()
                break
            case GameState.Playing:
                this.handlePlayingState()
                break
            case GameState.GameOver:
                SoundManager.playGameOverSound()
                break
        }

        this.OnGameStateChanged.invoke(this.gameState)
    }

    private static handleReadyState() {
        const scene = SceneManager.getSceneByName('MainMenuScene')
        if (scene) SceneManager.loadScene(scene)
    }

    private static handlePlayingState() {
        const scene = SceneManager.getSceneByName('GameplayScene')
        if (scene) SceneManager.loadScene(scene)
    }

    public static getGameState(): GameState {
        return this.gameState
    }
}
