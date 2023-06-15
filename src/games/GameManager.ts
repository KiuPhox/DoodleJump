import { Event } from '../engine/event/Event'
import { SceneManager } from '../engine/system/scene/SceneManager'
import { GameState } from './GameState'
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
            case GameState.READY:
                this.handleReadyState()
                break
            case GameState.PLAYING:
                this.handlePlayingState()
                break
            case GameState.GAME_OVER:
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
