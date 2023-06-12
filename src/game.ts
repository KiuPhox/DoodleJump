import { GameManager } from "./games/GameManager"
import { Time } from "./engine/system/Time"
import { Canvas } from "./engine/system/Canvas"
import { UIManager } from "./engine/UI/UIManager"
import { Physic } from "./engine/system/Physic"
import { Input } from "./engine/system/Input"
import { Layer } from "./engine/system/Layer"
import { GameState } from "./games/GameState"
import { GameObject } from "./engine/system/GameObject"
import { SoundManager } from "./games/SoundManager"
import { TweenManager } from "./engine/system/Tween/TweenManager"

const FRAME_RATE = 300

export class Game {

    private static gameObjects: GameObject[] = []

    constructor() {
        Input.init()
        Time.init()
        UIManager.init()
        Canvas.init('game')
        Layer.init()
        SoundManager.init()
        TweenManager.init()

        GameManager.init()
        GameManager.updateGameState(GameState.Ready)

        this.loop()
    }

    private loop() {
        if (Time.deltaTime >= 1 / FRAME_RATE) {
            Physic.update() // Physic
            Game.update() // Update
            TweenManager.update()
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

    public static unregisterGameObject(gameObject: GameObject): void{
        Game.gameObjects.slice(Game.gameObjects.indexOf(gameObject), 1)
    }

    public static Find(gameObjectName: string) : GameObject | null{
        for (let i = 0; i < Game.gameObjects.length; i++) {
            if (Game.gameObjects[i].name == gameObjectName) {
                return Game.gameObjects[i]
            }
        }
        return null
    }
}

new Game()

