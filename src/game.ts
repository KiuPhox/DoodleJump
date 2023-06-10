import { GameManager } from "./games/GameManager"
import { Time } from "./engine/system/Time"
import { Canvas } from "./engine/system/Canvas"
import { UIManager } from "./engine/UI/UIManager"
import { Physic } from "./engine/system/Physic"
import { Input } from "./engine/system/Input"
import { Layer } from "./engine/system/Layer"
import { GameState } from "./games/GameState"
import { GameObject } from "./engine/system/GameObject"

const FRAME_RATE = 300

export class Game {
    private static gameState: GameState
    // private gameOver: GameOver
    // private message: Message
    // private playAgainButton: PlayAgainButton

    private static gameObjects: GameObject[] = []

    constructor() {
        Input.init()
        Time.init()
        UIManager.init()
        Canvas.init('game')
        Layer.init()

        GameManager.init()
        GameManager.updateGameState(GameState.Ready)

        this.loop()
    }

    private loop() {
        if (Time.deltaTime >= 1 / FRAME_RATE) {
            Physic.update() // Physic
            Game.update() // Update
            Canvas.draw() // Render
            Input.reset() // Reset input
            Time.lastFrameTime = window.performance.now()
        }

        window.requestAnimationFrame(() => {
            this.loop()
        })
    }

    private static update(): void {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].executeUpdate()
        }
    }
    
    public static registerGameObject(gameObject: GameObject): void {
        Game.gameObjects.push(gameObject)
    }
}

new Game()

