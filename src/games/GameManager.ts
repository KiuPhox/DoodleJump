import { Event } from "../engine/event/Event"
import { Layer } from "../engine/system/Layer"
import { Physic } from "../engine/system/Physic"
import { GameState } from "./GameState"
import Background from "./Background"
import { Player } from "./Player"
import { Enviroment } from "./Enviroment"
import { TopBar } from "./TopBar"
import { PlatformGenerator } from "./PlatformGenerator"
import { PlayButton } from "./ui/PlayButton"
import { BlackImage } from "./ui/BlackImage"

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

        new PlatformGenerator()

        new PlayButton()

        this.blackImage = new BlackImage()


        // for (let i = 0; i < 200; i++){
        //     const platform = new BasePlatform()
        //     platform.transform.position = new Vector2(Utils.RandomFloat(-150, 150), Utils.RandomFloat(-5000, 300))
        //     platform.parent = enviroment
        // }
        this.updateGameState(GameState.Ready)
    }

    public static updateGameState(gameState: GameState): void {
        this.gameState = gameState

        switch (this.gameState) {
            case GameState.Ready:
                break
            case GameState.Playing:
                this.blackImage.show(1)
                break
            case GameState.GameOver:
                break
        }

        this.OnGameStateChanged.invoke(this.gameState)
    }

    public static getGameState(): GameState {
        return this.gameState
    }
}