import { GameManager } from "./games/GameManager"
import { Time } from "./engine/system/Time"
import { Canvas } from "./engine/system/Canvas"
import { UIManager } from "./engine/UI/UIManager"
import { Physic } from "./engine/system/Physic"
import { Input } from "./engine/system/input/Input"
import { Layer } from "./engine/system/Layer"
import { GameObject } from "./engine/system/GameObject"
import { SoundManager } from "./games/SoundManager"
import { TweenManager } from "./engine/system/tween/TweenManager"
import { ImagePreload } from "./engine/loader/ImagePreload"
import { MainMenuScene } from "./games/scene/MainMenuScene"
import { SceneManager } from "./engine/system/scene/SceneManager"
import { GameplayScene } from "./games/scene/GameplayScene"
import { GameState } from "./games/GameState"

const FRAME_RATE = 300

const PRELOAD_IMAGES = ['assets/images/green-platform.png', 
                        'assets/images/blue-platform.png',
                        'assets/images/brown-platform-0.png',
                        'assets/images/brown-platform-1.png',
                        'assets/images/brown-platform-2.png',
                        'assets/images/brown-platform-3.png',
                        'assets/images/white-platform.png',
                        'assets/images/lik-left.png',
                        'assets/images/spring-0.png',
                        'assets/images/spring-1.png',
                        'assets/images/hat.png',
                        'assets/images/jetpack.png',
                        'assets/images/play-on.png',
                        'assets/images/top-score.png',
                        'assets/images/doodle-jump.png',
                        'assets/images/play.png',
                        'assets/images/play-on.png',
                        'assets/images/monster-1.png',
                        'assets/images/hole.png',]

export class Game {

    private static gameObjects: GameObject[] = []

    constructor() {
        ImagePreload.init()

        SoundManager.init().then(()=>{
            ImagePreload.load(PRELOAD_IMAGES).then(()=>{
                Time.init()
                UIManager.init()
                Canvas.init('game')
                Input.init()
                Layer.init()
    
                TweenManager.init()
    
                Layer.add('Background')
                Physic.setInteractiveLayer('Background', 'Background', false)
    
                GameManager.init()
    
                SceneManager.init()
    
                GameManager.updateGameState(GameState.Ready)
    
                new MainMenuScene()
                new GameplayScene()
    
                this.loop()
            })
        })
    }

    private loop() {
        if (Time.deltaTime >= 1 / FRAME_RATE) {
            Physic.update() // Physic
            TweenManager.update()
            SceneManager.update()
            Canvas.draw() // Render
            Input.reset() // Reset input
            Time.lastFrameTime = window.performance.now()

        }

        window.requestAnimationFrame(() => {
            this.loop()
        })
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

